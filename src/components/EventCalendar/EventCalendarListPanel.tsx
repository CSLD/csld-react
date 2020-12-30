import React, { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { useApolloClient, useQuery } from '@apollo/client'
import { Form as FinalForm } from 'react-final-form'
import { Col, Row } from 'react-bootstrap'
import isInBrowser from 'is-in-browser'
import { darkTheme } from '../../theme/darkTheme'
import {
    CalendarEventDataFragment,
    LoadCalendarEventsQuery,
    LoadCalendarEventsQueryVariables,
    MoreCalendarEventsQuery,
    MoreCalendarEventsQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import { LabelFromGql } from '../common/LabelsEditColumn/LabelsEditColumn'
import { labelMapper } from '../../hooks/usePredefinedLabels'
import { TabDefinition, Tabs } from '../common/Tabs/Tabs'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import Pager from '../common/Pager/Pager'
import LabelFilterFields from '../common/LabelFilterFields/LabelFilterFields'
import CalendarEventPanel from './CalendarEventPanel'
import { formSectionHeader } from '../../utils/formClasses'
import FormTextInputField from '../common/form/FormTextInputField'
import BigLoading from '../common/BigLoading/BigLoading'

const loadCalendarEventsGql = require('./graphql/loadCalendarEvents.graphql')
const moreCalendarEventsGql = require('./graphql/moreCalendarEvents.graphql')

interface Props {
    readonly initialRequiredLabelIds?: string[]
    readonly initialOptionalLabelIds?: string[]
}

interface FormValues {
    from: string
    to?: string
    requiredLabels: string[]
    optionalLabels: string[]
}

const useStyles = createUseStyles({
    row: {
        backgroundColor: darkTheme.backgroundWhite,
        padding: '20px 0',
    },
    loading: {
        opacity: 0.5,
    },
    formSectionHeader,
})

const PAGE_SIZE = 25

type Page = Partial<{
    events: CalendarEventDataFragment[]
    totalAmount: number
}>

const format2 = (num: number) => (num < 10 ? `0${num}` : `${num}`)

const tabs: Array<TabDefinition<number>> = [
    {
        key: 0,
        title: { key: 'EventCalendar.events' },
    },
]

const EventCalendarListPanel = ({ initialRequiredLabelIds, initialOptionalLabelIds }: Props) => {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState<Page>({})
    const [requiredLabels, setRequiredLabels] = useState<LabelFromGql[] | undefined>(undefined)
    const [optionalLabels, setOptionalLabels] = useState<LabelFromGql[] | undefined>(undefined)
    const client = useApolloClient()
    const initialValues = useMemo(() => {
        const now = new Date()
        return {
            from: `${now.getFullYear()}-${format2(now.getMonth() + 1)}-${now.getDate()}`,
            requiredLabels: initialRequiredLabelIds || [],
            optionalLabels: initialOptionalLabelIds || [],
        } as FormValues
    }, [initialRequiredLabelIds, initialOptionalLabelIds])

    useQuery<LoadCalendarEventsQuery, LoadCalendarEventsQueryVariables>(loadCalendarEventsGql, {
        variables: {
            from: initialValues.from,
            requiredLabels: initialRequiredLabelIds,
            optionalLabels: initialOptionalLabelIds,
            offset: 0,
            limit: PAGE_SIZE,
        },
        ssr: false,
        skip: !isInBrowser,
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first', // Do not reload on page change
        onCompleted: response => {
            setLoading(false)
            setPage(response.eventCalendar)
            setRequiredLabels(response.authorizedRequiredLabels?.map(labelMapper))
            setOptionalLabels(response.authorizedOptionalLabels?.map(labelMapper))
        },
    })

    const { events } = page

    return (
        <FinalForm<FormValues> initialValues={initialValues} onSubmit={() => {}}>
            {({ values }) => {
                const refreshList = ({
                    newOffset,
                    newFrom,
                    newTo,
                    newRequiredLabels,
                    newOptionalLabels,
                }: {
                    newOffset?: number
                    newFrom?: string
                    newTo?: string
                    newRequiredLabels?: string[]
                    newOptionalLabels?: string[]
                }) => {
                    setLoading(true)
                    client
                        .query<MoreCalendarEventsQuery, MoreCalendarEventsQueryVariables>({
                            query: moreCalendarEventsGql,
                            fetchPolicy: 'network-only',
                            variables: {
                                from: newFrom || values.from,
                                to: newTo || values.to,
                                offset: newOffset !== undefined ? newOffset : offset,
                                limit: PAGE_SIZE,
                                requiredLabels: newRequiredLabels || values.requiredLabels,
                                optionalLabels: newOptionalLabels || values.optionalLabels,
                            },
                        })
                        .then(response => {
                            setPage(response.data.eventCalendar)
                            setLoading(false)
                        })
                }

                const handleOffsetChanged = (newOffset: number) => {
                    setOffset(newOffset)
                    refreshList({ newOffset })
                }

                const handleFromChanged = (e: ChangeEvent<HTMLInputElement>) => {
                    refreshList({ newFrom: e.target.value })
                }

                const handleToChanged = (e: ChangeEvent<HTMLInputElement>) => {
                    refreshList({ newTo: e.target.value })
                }

                return (
                    <>
                        <Tabs<number> tabs={tabs} selectedTab={0} />
                        <div className={classes.row}>
                            {(!events || !requiredLabels || !optionalLabels) && <BigLoading />}
                            {events && requiredLabels && optionalLabels && (
                                <WidthFixer className={loading ? classes.loading : undefined}>
                                    <Row>
                                        <Col md={9}>
                                            {events.map(event => (
                                                <CalendarEventPanel key={event.id} event={event} />
                                            ))}
                                            <Pager
                                                currentOffset={offset}
                                                pageSize={PAGE_SIZE}
                                                totalAmount={page.totalAmount ?? 0}
                                                onOffsetChanged={handleOffsetChanged}
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <header className={classes.formSectionHeader}>
                                                {t('EventCalendar.eventFrom')}
                                            </header>
                                            <FormTextInputField
                                                name="from"
                                                type="date"
                                                showErrorPlaceholder={false}
                                                onChange={handleFromChanged}
                                            />
                                            <header className={classes.formSectionHeader}>
                                                {t('EventCalendar.eventTo')}
                                            </header>
                                            <FormTextInputField
                                                name="to"
                                                type="date"
                                                showErrorPlaceholder={false}
                                                onChange={handleToChanged}
                                            />
                                            <LabelFilterFields
                                                requiredLabelList={requiredLabels}
                                                optionalLabelList={optionalLabels}
                                                onSelectionChanged={refreshList}
                                            />
                                        </Col>
                                    </Row>
                                </WidthFixer>
                            )}
                        </div>
                    </>
                )
            }}
        </FinalForm>
    )
}

export default EventCalendarListPanel
