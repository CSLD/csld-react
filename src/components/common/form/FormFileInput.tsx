import React, { ChangeEvent, useState } from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../../theme/darkTheme'

export interface FormFileInputProps {
    readonly input: FieldInputProps<string>
    readonly meta: FieldMetaState<string>
    readonly sizeLimit: number
    readonly label?: string
    readonly placeholder?: string
    readonly showErrorPlaceholder?: boolean
    readonly hint?: string
    readonly controlId?: string
}

const useStyles = createUseStyles({
    hintHolder: {
        color: darkTheme.text,
    },
})

const FormFileInput = ({
    input: { onFocus, onBlur, onChange },
    meta,
    sizeLimit,
    label,
    placeholder,
    showErrorPlaceholder,
    hint,
    controlId,
}: FormFileInputProps) => {
    const { t } = useTranslation('common')
    const [fileTooBigError, setFileTooBigError] = useState(false)
    const [fileName, setFileName] = useState('')
    const classes = useStyles()

    const errorText = fileTooBigError ? t('FormFileInput.fileTooBig') : meta.error
    const showError = fileTooBigError || ((meta.touched || meta.modified) && meta.error)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.item(0)
        if (file) {
            if (file.size > sizeLimit) {
                setFileTooBigError(true)
            } else {
                setFileTooBigError(false)

                const reader = new FileReader()
                reader.addEventListener('load', pe => {
                    const fileContents = pe.target?.result
                    if (fileContents) {
                        onChange({ target: { value: `${file.name}\t${btoa(fileContents as string)}` } })
                        setFileName(`${file.name} (${(file.size / 1000).toFixed(0)} kB)`)
                    }
                })
                reader.readAsBinaryString(file)
            }
        } else {
            // Cleared
            onChange({ target: { value: '' } })
            setFileName('')
            setFileTooBigError(false)
        }
    }

    return (
        <Form.Group controlId={controlId}>
            <Form.File custom>
                <Form.File.Input isInvalid={showError} onFocus={onFocus} onBlur={onBlur} onChange={handleOnChange} />
                <Form.File.Label data-browse={label || t('FormFileInput.defaultLabel')}>
                    {fileName || placeholder || t('FormFileInput.defaultPlaceholder')}
                </Form.File.Label>
                <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
                {!showError && (hint || showErrorPlaceholder) && (
                    <Form.Text className={classes.hintHolder}>{hint || '\u00A0'}</Form.Text>
                )}
            </Form.File>
        </Form.Group>
    )
}

export default FormFileInput
