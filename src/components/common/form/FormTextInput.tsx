import React from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import { Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import FieldWithError from './FieldWithError'
import { createUseStyles } from 'react-jss'

export interface FormTextInputProps {
    readonly input: FieldInputProps<string>
    readonly meta: FieldMetaState<string>
    readonly showErrorPlaceholder?: boolean
    readonly label?: string
    readonly placeholder?: string
    readonly appendIcon?: React.ReactElement
    readonly hint?: string
    readonly type?: string
}

const FormTextInput = ({
    input,
    meta,
    showErrorPlaceholder = true,
    placeholder,
    label,
    type,
    appendIcon,
    hint,
}: FormTextInputProps) => {
    return (
        <FieldWithError meta={meta} showErrorPlaceholder={showErrorPlaceholder}>
            {label && <Form.Label>{label}</Form.Label>}
            {appendIcon && (
                <InputGroup>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Form.Control type={type} {...input} placeholder={placeholder} />
                    <InputGroup.Append>
                        {hint && (
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id={`${input.name}-tooltip`}>{hint}</Tooltip>}
                            >
                                <InputGroup.Text>{appendIcon}</InputGroup.Text>
                            </OverlayTrigger>
                        )}
                        {!hint && appendIcon}
                    </InputGroup.Append>
                </InputGroup>
            )}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {!appendIcon && <Form.Control type={type} {...input} placeholder={placeholder} />}
        </FieldWithError>
    )
}

export default FormTextInput
