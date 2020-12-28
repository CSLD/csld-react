import React, { ChangeEvent, FocusEvent, useState } from 'react'
import { useField } from 'react-final-form'
import { FieldValidator } from 'final-form'
import { Form, InputGroup } from 'react-bootstrap'
import FieldWithError from './FieldWithError'

export interface FormTextInputFieldProps {
    readonly name: string
    readonly hint?: string
    readonly validate?: FieldValidator<string>
    readonly showErrorPlaceholder?: boolean
    readonly label?: string
    readonly placeholder?: string
    readonly appendIcon?: React.ReactElement
    readonly type?: string
    readonly onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    readonly errorHint?: React.ReactNode
    readonly autoFocus?: boolean
}

/**
 * Convenience wrapper around FormTextInput
 */
const FormTextInputField = ({
    name,
    hint,
    validate,
    showErrorPlaceholder = true,
    placeholder,
    label,
    type,
    appendIcon,
    errorHint,
    autoFocus,
    onBlur,
    onChange,
}: FormTextInputFieldProps) => {
    const {
        input: { onBlur: inputOnBlur, onChange: inputOnChange, ...inputRest },
        meta,
    } = useField(name, { validate })
    const [wasBlurred, setWasBlurred] = useState(false)

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        setWasBlurred(true)
        inputOnBlur?.(e)
        onBlur?.(e)
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        inputOnChange?.(e)
        onChange?.(e)
    }

    return (
        <FieldWithError
            meta={meta}
            showErrorPlaceholder={showErrorPlaceholder}
            hint={hint}
            errorHint={errorHint}
            hideError={!wasBlurred}
        >
            {isInvalid => (
                <>
                    {label && <Form.Label>{label}</Form.Label>}
                    {appendIcon && (
                        <InputGroup>
                            <Form.Control
                                isInvalid={isInvalid}
                                type={type}
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                autoFocus={autoFocus}
                                /* eslint-disable-next-line react/jsx-props-no-spreading */
                                {...inputRest}
                                placeholder={placeholder}
                            />
                            <InputGroup.Append>{appendIcon}</InputGroup.Append>
                        </InputGroup>
                    )}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {!appendIcon && (
                        <Form.Control
                            isInvalid={isInvalid}
                            type={type}
                            onBlur={handleOnBlur}
                            onChange={handleOnChange}
                            /* eslint-disable-next-line react/jsx-props-no-spreading */
                            {...inputRest}
                            placeholder={placeholder}
                        />
                    )}
                </>
            )}
        </FieldWithError>
    )
}

export default FormTextInputField
