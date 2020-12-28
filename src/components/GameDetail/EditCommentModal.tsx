import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal } from 'react-bootstrap'
import { EditorState } from 'draft-js'
import { Form } from 'react-final-form'
import { editorStateToHtml, htmlToEditorState } from '../common/form/richTextInputUtils'
import FormRichTextInputField from '../common/form/FormRichTextInputField'

interface Props {
    readonly oldText: string
    readonly onHide: () => void
    readonly onSubmit: (newText: string) => Promise<void>
}

interface FormValues {
    readonly comment: EditorState
}

const EditCommentModal = ({ oldText, onHide, onSubmit }: Props) => {
    const { t } = useTranslation('common')
    const [loading, setLoading] = useState(false)

    const handleSave = ({ comment }: FormValues) => {
        setLoading(true)
        const markup = editorStateToHtml(comment)
        onSubmit(markup || '').catch(() => {})
        setLoading(false)
    }

    const initialValues = useMemo(() => ({ comment: htmlToEditorState(oldText) }), [oldText])

    return (
        <Form<FormValues> onSubmit={handleSave} initialValues={initialValues}>
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
                            <Button variant="dark" type="submit" disabled={loading}>
                                {t('EditCommentModal.save')}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            )}
        </Form>
    )
}

export default EditCommentModal
