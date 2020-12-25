import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Form } from 'react-final-form'
import { Button, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { darkTheme } from '../../theme/darkTheme'
import FormTextInputField from '../common/form/FormTextInputField'
import FormRichTextInputField, { RichTextFieldValue } from '../common/form/FormRichTextInputField'
import {
    fieldValidator,
    validatePositiveInteger,
    validateRequired,
    validateRequiredArray,
} from '../../utils/validationUtils'
import FormFileInputField from '../common/form/FormFileInputField'
import FormCheckBoxField from '../common/form/FormCheckBoxField'
import AuthorsAutoCompleteField from './AuthorsAutoCompleteField'
import GroupsAutoCompleteField from './GroupsAutoCompleteField'
import { GroupAuthor } from './NewGroupModal'
import { Author } from './NewAuthorModal'
import FormLabelListField from '../common/form/FormLabelListField'
import NewLabelsField, { NewLabel } from '../common/form/NewLabelsField/NewLabelsField'
import { LabelData, useLoadLabels } from '../../hooks/usePredefinedLabels'

export interface FormValues {
    name?: string
    description?: RichTextFieldValue
    authors: Author[]
    groupAuthors: GroupAuthor[]
    year?: string
    players?: string
    womenRole?: string
    menRole?: string
    bothRole?: string
    hours?: string
    days?: string
    coverImage?: string
    web?: string
    photoAuthor?: string
    galleryUrl?: string
    video?: string
    ratingsDisabled?: boolean
    commentsDisabled?: boolean
    requiredLabels: string[]
    otherLabels: string[]
    newLabels: NewLabel[]
}

interface Props {
    readonly initialValues?: FormValues
    readonly existingRequiredLabels?: LabelData[]
    readonly existingOptionalLabels?: LabelData[]
}

const emptyInitialValues: FormValues = {
    authors: [],
    groupAuthors: [],
    requiredLabels: [],
    otherLabels: [],
    newLabels: [],
}

const useStyles = createUseStyles({
    form: {
        color: darkTheme.textOnLight,
    },
    helpText: {
        fontSize: '0.75rem',
    },
    header: {
        backgroundColor: darkTheme.backgroundRealWhite,
        fontSize: '1.25rem',
        color: darkTheme.textOnLight,
        borderBottom: '1px solid rgba(0,0,0,.1)',
        margin: '0 0 12px -18px',
        padding: '8px 8px 8px 18px',
    },
    headerRight: {
        margin: '0 -18px 12px -18px',
    },
    subHeader: {
        color: darkTheme.textOnLight,
        borderBottom: '1px solid rgba(0,0,0,.1)',
        marginBottom: 20,
    },
    formError: {
        marginLeft: 16,
        color: darkTheme.red,
    },
})

const GameEditPanel = ({ initialValues, existingRequiredLabels, existingOptionalLabels }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const [loading, setLoading] = useState(false)
    const { requiredLabels, optionalLabels, existingLabelNames } = useLoadLabels(
        existingRequiredLabels,
        existingOptionalLabels,
    )

    const handleOnSubmit = () => {
        setLoading(true)
    }

    const piValidator = fieldValidator(t, validatePositiveInteger)

    return (
        <Form onSubmit={handleOnSubmit} initialValues={initialValues || emptyInitialValues}>
            {({ handleSubmit, submitFailed }) => {
                return (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Row>
                            <Col md={9}>
                                <header className={classes.header}>{t('GameEdit.help')}</header>
                                <div>
                                    <p className={classes.helpText}>{t('GameEdit.help1')}</p>
                                    <p className={classes.helpText}>{t('GameEdit.help2')}</p>
                                    <p className={classes.helpText}>{t('GameEdit.help3')}</p>
                                    <p className={classes.helpText}>{t('GameEdit.help4')}</p>
                                </div>
                                <header className={classes.header}>{t('GameEdit.addGame')}</header>
                                <header className={classes.subHeader}>{t('GameEdit.requiredFields')}</header>
                                <FormTextInputField
                                    name="name"
                                    placeholder={t('GameEdit.name')}
                                    validate={fieldValidator(t, validateRequired)}
                                    autoFocus
                                />
                                <FormRichTextInputField name="description" hint={t('GameEdit.description')} />
                                <header className={classes.subHeader}>{t('GameEdit.additionalFields')}</header>
                                <Row>
                                    <Col md={6}>
                                        <AuthorsAutoCompleteField
                                            name="authors"
                                            placeholder={t('GameEdit.authors')}
                                            hint={t('AutoComplete.startTyping')}
                                            validate={fieldValidator(t, validateRequiredArray)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <GroupsAutoCompleteField
                                            name="groupAuthors"
                                            placeholder={t('GameEdit.groups')}
                                            hint={t('AutoComplete.startTyping')}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormTextInputField
                                            name="year"
                                            placeholder={t('GameEdit.year')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                    <Col md={6} />
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <FormTextInputField
                                            name="players"
                                            placeholder={t('GameEdit.players')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <FormTextInputField
                                            name="womenRole"
                                            placeholder={t('GameEdit.womenRole')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <FormTextInputField
                                            name="menRole"
                                            placeholder={t('GameEdit.menRole')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <FormTextInputField
                                            name="bothRole"
                                            placeholder={t('GameEdit.bothRole')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormTextInputField
                                            name="hours"
                                            placeholder={t('GameEdit.hours')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <FormTextInputField
                                            name="days"
                                            placeholder={t('GameEdit.days')}
                                            validate={piValidator}
                                        />
                                    </Col>
                                </Row>
                                <header className={classes.subHeader}>{t('GameEdit.presentationFields')}</header>
                                <Row>
                                    <Col md={6}>
                                        <FormFileInputField
                                            name="coverImage"
                                            placeholder={t('GameEdit.coverImage')}
                                            hint={t('GameEdit.coverImageHint')}
                                            sizeLimit={2000000}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <FormTextInputField name="web" placeholder={t('GameEdit.web')} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormTextInputField
                                            name="photoAuthor"
                                            placeholder={t('GameEdit.photoAuthor')}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <FormTextInputField name="galleryUrl" placeholder={t('GameEdit.galleryUrl')} />
                                    </Col>
                                    <Col md={4}>
                                        <FormTextInputField name="video" placeholder={t('GameEdit.video')} />
                                    </Col>
                                </Row>
                                <header className={classes.subHeader}>{t('GameEdit.settingsFields')}</header>
                                <FormCheckBoxField
                                    name="ratingsDisabled"
                                    label={t('GameEdit.ratingsDisabled')}
                                    hint={t('GameEdit.ratingsDisabledHint')}
                                />
                                <FormCheckBoxField
                                    name="commentsDisabled"
                                    label={t('GameEdit.commentsDisabled')}
                                    hint={t('GameEdit.commentsDisabledHint')}
                                />
                                <Button variant="dark" type="submit" disabled={loading}>
                                    {t('GameEdit.save')}
                                </Button>
                                {submitFailed && <span className={classes.formError}>{t('GameEdit.formError')}</span>}
                            </Col>
                            <Col md={3}>
                                <header className={classNames(classes.header, classes.headerRight)}>
                                    {t('GameEdit.labels')}
                                </header>
                                <p className={classes.helpText}>{t('GameEdit.labelsHint')}</p>
                                <header className={classes.subHeader}>{t('GameEdit.requiredLabels')}</header>
                                <FormLabelListField
                                    name="requiredLabels"
                                    labels={requiredLabels}
                                    validate={fieldValidator(t, validateRequiredArray)}
                                />
                                <header className={classes.subHeader}>{t('GameEdit.optionalLabels')}</header>
                                <FormLabelListField name="optionalLabels" labels={optionalLabels} />
                                <NewLabelsField name="newLabels" existingLabelNames={existingLabelNames} />
                            </Col>
                        </Row>
                    </form>
                )
            }}
        </Form>
    )
}

export default GameEditPanel
