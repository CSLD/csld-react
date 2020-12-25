import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useFocusInput } from '../../../../hooks/useFocusInput'
import FormTextInputField from '../FormTextInputField'
import { fieldValidator, validateRequired } from '../../../../utils/validationUtils'

interface Props {
    readonly existingNewLabels: Array<{ name: string }>
    readonly existingLabelNames: string[]
    readonly onHide: () => void
    readonly onCreateLabel: (label: { name: string; description?: string }) => void
}

interface FormValues {
    name: string
    description?: string
}

const NewLabelModal = ({ existingNewLabels, existingLabelNames, onHide, onCreateLabel }: Props) => {
    const formRef = useFocusInput<HTMLFormElement>('name')
    const { t } = useTranslation('common')

    const validate = ({ name }: FormValues) => {
        const error = validateRequired(name)
        if (error) {
            return { name: t(error) }
        }

        if (existingLabelNames.find(labelName => labelName.localeCompare(name) === 0)) {
            return { name: t('NewLabelModal.labelExists') }
        }

        if (existingNewLabels.find(existingLabel => existingLabel.name.localeCompare(name) === 0)) {
            return { name: t('NewLabelModal.labelExists') }
        }

        return undefined
    }

    return (
        <Modal show onHide={onHide}>
            <Form<FormValues> onSubmit={onCreateLabel} validate={validate}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <Modal.Header closeButton>
                            <Modal.Title>{t('NewLabelModal.title')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormTextInputField
                                name="name"
                                placeholder={t('NewLabelModal.name')}
                                validate={fieldValidator(t, validateRequired)}
                            />
                            <FormTextInputField name="description" placeholder={t('NewLabelModal.description')} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={onHide}>
                                {t('NewLabelModal.cancel')}
                            </Button>
                            <Button variant="dark" type="submit">
                                {t('NewLabelModal.save')}
                            </Button>
                        </Modal.Footer>
                    </form>
                )}
            </Form>
        </Modal>
    )
}

export default NewLabelModal
