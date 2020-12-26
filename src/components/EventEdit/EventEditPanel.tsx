import React, { useMemo } from 'react'
import { EditorState } from 'draft-js'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { Form } from 'react-final-form'
import { Button, Col, Row } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
import { TFunction } from 'i18next'
import { NewLabel } from '../common/form/NewLabelsField/NewLabelsField'
import {
    CreateEventInput,
    CreateEventMutation,
    CreateEventMutationVariables,
    Event,
    Game,
    Label,
    LoadEventForEditQuery,
    LoadEventForEditQueryVariables,
    Maybe,
    UpdateEventMutation,
    UpdateEventMutationVariables,
} from '../../graphql/__generated__/typescript-operations'
import { fieldValidator, validatePositiveInteger, validateRequired, validateTime } from '../../utils/validationUtils'
import { useFocusInput } from '../../hooks/useFocusInput'
import { formClasses } from '../../utils/formClasses'
import LabelsEditColumn from '../common/LabelsEditColumn/LabelsEditColumn'
import FormTextInputField from '../common/form/FormTextInputField'
import FormRichTextInputField from '../common/form/FormRichTextInputField'
import GamesAutoCompleteField, { createGameLabel, LinkedGame } from './GamesAutoCompleteField'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { editorStateToHtml } from '../common/form/richTextInputUtils'
import { useRoutes } from '../../hooks/useRoutes'

const loadEventForEditGql = require('./graphql/loadEventForEdit.graphql')
const createEventGql = require('./graphql/createEvent.graphql')
const updateEventGql = require('./graphql/updateEvent.graphql')

interface Props {
    readonly eventId?: string
}

interface FormValues {
    name: string
    fromDate?: string
    fromTime?: string
    toDate?: string
    toTime?: string
    amountOfPlayers?: string
    web?: string
    loc: string
    games: LinkedGame[]
    description?: string | EditorState
    requiredLabels: string[]
    optionalLabels: string[]
    newLabels: NewLabel[]
}

const emptyInitialValues: FormValues = {
    name: '',
    fromDate: '',
    toDate: '',
    loc: '',
    games: [],
    requiredLabels: [],
    optionalLabels: [],
    newLabels: [],
}

const useStyles = createUseStyles(formClasses)

type LoadedEvent = Pick<Event, 'id' | 'name' | 'from' | 'to' | 'amountOfPlayers' | 'web' | 'loc' | 'description'> & {
    games?: Maybe<Array<Pick<Game, 'id' | 'name' | 'year'>>>
    labels?: Maybe<Array<Pick<Label, 'id' | 'name' | 'description' | 'isRequired'>>>
}

const dateTimeRe = /^([-0-9]+) ([0-9]+:[0-9]+):/
const parseDateTime = (dateTime: string | undefined | null) => {
    if (!dateTime) {
        return undefined
    }

    return dateTimeRe.exec(dateTime)
}

const getDate = (dateTime: string | undefined | null) => {
    const match = parseDateTime(dateTime)
    if (!match) {
        return undefined
    }

    return match[1]
}

const getTime = (dateTime: string | undefined | null) => {
    const match = parseDateTime(dateTime)
    if (!match) {
        return undefined
    }

    return match[2]
}

const toInitialValues = (event: LoadedEvent): FormValues => ({
    name: event.name ?? '',
    fromDate: getDate(event.from),
    fromTime: getTime(event.from),
    toDate: getDate(event.to),
    toTime: getTime(event.to),
    amountOfPlayers: event.amountOfPlayers.toString(),
    web: event.web ?? undefined,
    loc: event.loc ?? '',
    description: event.description ?? undefined,
    games: (event.games ?? []).map(({ id, name, year }) => ({
        id,
        name: name ?? '',
        itemLabel: createGameLabel({ name, year }),
    })),
    requiredLabels: (event.labels ?? []).filter(({ isRequired }) => isRequired).map(({ id }) => id),
    optionalLabels: (event.labels ?? []).filter(({ isRequired }) => !isRequired).map(({ id }) => id),
    newLabels: [],
})

const timeRe = /^([0-9]+):([0-9]+)$/
const parseMinutes = (value: string): number => {
    const match = timeRe.exec(value)
    if (!match) {
        return 0
    }

    return parseInt(match[1], 10) * 60 + parseInt(match[2], 10)
}

const validate = (t: TFunction) => (data: FormValues) => {
    const res = {} as { [key in keyof FormValues]: string }
    res.fromDate = fieldValidator(t, validateRequired)(data.fromDate)
    res.toDate = fieldValidator(t, validateRequired)(data.toDate)

    res.fromTime = fieldValidator(t, validateTime)(data.fromTime)
    res.toTime = fieldValidator(t, validateTime)(data.toTime)

    if (data.fromTime && !data.toTime) {
        res.toTime = t('EventEdit.fillBothTimes')
    }

    if (!data.fromTime && data.toTime) {
        res.fromTime = t('EventEdit.fillBothTimes')
    }

    if (!res.fromDate && !res.toDate) {
        // Check date relationship
        const from = new Date(data.fromDate || '').getTime()
        const to = new Date(data.toDate || '').getTime()

        if (to < from) {
            res.toDate = t('EventEdit.dateMismatch')
        }
        if (to === from && data.fromTime && data.toTime && !res.fromTime && !res.toTime) {
            if (parseMinutes(data.fromTime || '') >= parseMinutes(data.toTime || '')) {
                res.toTime = t('EventEdit.timeMismatch')
            }
        }
    }

    return res
}

const buildDateTime = (date: string, time?: string) => (time ? `${date} ${time}:00` : `${date} 00:00:00`)

const createInputFromValues = (data: FormValues): CreateEventInput => ({
    name: data.name,
    fromDate: buildDateTime(data.fromDate || '', data.fromTime),
    toDate: buildDateTime(data.toDate || '', data.toTime),
    amountOfPlayers: parseInt(data.amountOfPlayers || '1', 10),
    web: data.web,
    loc: data.loc,
    description: editorStateToHtml(data.description),
    games: data.games.map(({ id }) => id),
    labels: [...data.requiredLabels, ...data.optionalLabels],
    newLabels: data.newLabels,
})

const EventEditPanel = ({ eventId }: Props) => {
    const { t } = useTranslation('common')
    const routes = useRoutes()
    const formRef = useFocusInput<HTMLFormElement>('name')
    const classes = useStyles()
    const { data } = useQuery<LoadEventForEditQuery, LoadEventForEditQueryVariables>(loadEventForEditGql, {
        variables: {
            eventId: eventId || '',
        },
        skip: !eventId,
    })
    const [createEvent, { loading: createLoading }] = useMutation<CreateEventMutation, CreateEventMutationVariables>(
        createEventGql,
    )
    const [updateEvent, { loading: updateLoading }] = useMutation<UpdateEventMutation, UpdateEventMutationVariables>(
        updateEventGql,
    )
    const loading = createLoading || updateLoading

    const eventById = data?.eventById
    const initialValues = useMemo(() => (eventById ? toInitialValues(eventById) : undefined), [eventById])
    const ready = !eventId || !!initialValues

    const handleOnSubmit = (values: FormValues) => {
        const input = createInputFromValues(values)
        if (eventId) {
            updateEvent({
                variables: { input: { id: eventId, ...input } },
            }).then(response => {
                const updatedEvent = response?.data?.event.updateEvent
                if (updatedEvent) {
                    routes.push(routes.eventDetail(updatedEvent.id, updatedEvent.name ?? ''))
                }
            })
        } else {
            createEvent({
                variables: { input },
            }).then(response => {
                const createdEvent = response?.data?.event.createEvent
                if (createdEvent) {
                    routes.push(routes.eventDetail(createdEvent.id, createdEvent.name ?? ''))
                }
            })
        }
    }

    if (!ready) {
        return <div />
    }

    return (
        <Form onSubmit={handleOnSubmit} initialValues={initialValues || emptyInitialValues} validate={validate(t)}>
            {({ handleSubmit, submitFailed }) => (
                <div className={classes.row}>
                    <WidthFixer className={classes.body}>
                        <form onSubmit={handleSubmit} className={classes.form} ref={formRef}>
                            <Row>
                                <Col md={9}>
                                    <header className={classes.header}>{t('EventEdit.addEvent')}</header>
                                    <header className={classes.subHeader}>{t('EventEdit.requiredFields')}</header>
                                    <FormTextInputField
                                        name="name"
                                        placeholder={t('EventEdit.name')}
                                        validate={fieldValidator(t, validateRequired)}
                                    />
                                    <Row>
                                        <Col md={6}>
                                            <FormTextInputField
                                                name="fromDate"
                                                type="date"
                                                hint={t('EventEdit.fromDate')}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <FormTextInputField
                                                name="fromTime"
                                                placeholder={t('EventEdit.fromTime')}
                                                hint={t('EventEdit.timeHint')}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormTextInputField
                                                name="toDate"
                                                type="date"
                                                hint={t('EventEdit.toDate')}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <FormTextInputField
                                                name="toTime"
                                                placeholder={t('EventEdit.toTime')}
                                                hint={t('EventEdit.timeHint')}
                                            />
                                        </Col>
                                    </Row>
                                    <FormTextInputField
                                        name="amountOfPlayers"
                                        placeholder={t('EventEdit.amountOfPlayers')}
                                        validate={fieldValidator(t, [validateRequired, validatePositiveInteger])}
                                    />
                                    <FormTextInputField name="web" placeholder={t('EventEdit.web')} />
                                    <FormTextInputField
                                        name="loc"
                                        placeholder={t('EventEdit.loc')}
                                        validate={fieldValidator(t, validateRequired)}
                                    />
                                    <FormRichTextInputField name="description" hint={t('EventEdit.description')} />
                                    <GamesAutoCompleteField
                                        name="games"
                                        placeholder={t('EventEdit.games')}
                                        hint={t('AutoComplete.startTyping')}
                                    />
                                    <Button variant="dark" type="submit" disabled={loading}>
                                        {t('EventEdit.save')}
                                    </Button>
                                    {submitFailed && (
                                        <span className={classes.formError}>{t('EventEdit.formError')}</span>
                                    )}
                                </Col>
                                <Col md={3}>
                                    <LabelsEditColumn
                                        authorizedRequiredLabels={data?.authorizedRequiredLabels}
                                        authorizedOptionalLabels={data?.authorizedOptionalLabels}
                                    />
                                </Col>
                            </Row>
                        </form>
                    </WidthFixer>
                </div>
            )}
        </Form>
    )
}

export default EventEditPanel
