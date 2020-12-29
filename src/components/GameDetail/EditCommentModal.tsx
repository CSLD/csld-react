import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'react-bootstrap'
import { EditorState } from 'draft-js'
import { Form as FinalForm } from 'react-final-form'
import { editorStateToHtml } from '../common/form/richTextInputUtils'
import FormRichTextInputField from '../common/form/FormRichTextInputField'
import SubmitButton from '../common/SubmitButton/SubmitButton'

interface Props {
    readonly oldText: string
    readonly onHide: () => void
    readonly onLoad: () => void
    readonly onSubmit: (newText: string) => Promise<void>
}

interface FormValues {
    readonly comment: EditorState | string | undefined
}

const EditCommentModal = ({ oldText, onHide, onLoad, onSubmit }: Props) => {
    const { t } = useTranslation('common')
    const [loading, setLoading] = useState(false)

    // Since we are lazy-load, call back (only!) when we are ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onLoad, [])

    const handleSave = async ({ comment }: FormValues) => {
        setLoading(true)
        const markup = editorStateToHtml(comment)
        await onSubmit(markup || '')
        setLoading(false)
    }

    const initialValues = useMemo(() => ({ comment: oldText }), [oldText])

    return (
        <FinalForm<FormValues> onSubmit={handleSave} initialValues={initialValues}>
            {({ handleSubmit }) => (
                <Modal show onHide={onHide} size="lg">
                    <form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>{t('EditCommentModal.title')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormRichTextInputField name="comment" autoFocus />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={onHide} disabled={loading}>
                                {t('EditCommentModal.cancel')}
                            </Button>
                            <SubmitButton submitting={loading}>{t('EditCommentModal.save')}</SubmitButton>
                        </Modal.Footer>
                    </form>
                </Modal>
            )}
        </FinalForm>
    )
}

export default EditCommentModal
