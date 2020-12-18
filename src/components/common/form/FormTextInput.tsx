import React, { FocusEvent, useState } from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import { Form, InputGroup } from 'react-bootstrap'
import FieldWithError from './FieldWithError'

export interface FormTextInputProps {
    readonly input: FieldInputProps<string>
    readonly meta: FieldMetaState<string>
    readonly showErrorPlaceholder?: boolean
    readonly label?: string
    readonly placeholder?: string
    readonly appendIcon?: React.ReactElement
    readonly hint?: string
    readonly type?: string
    readonly onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    readonly errorHint?: React.ReactNode
}

const FormTextInput = ({
    input: { onBlur: inputOnBlur, ...inputRest },
    meta,
    showErrorPlaceholder = true,
    placeholder,
    label,
    type,
    appendIcon,
    hint,
    errorHint,
    onBlur,
}: FormTextInputProps) => {
    const [wasBlurred, setWasBlurred] = useState(false)

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        setWasBlurred(true)
        inputOnBlur?.(e)
        onBlur?.(e)
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

export default FormTextInput
