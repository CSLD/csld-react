import React from 'react'
import { Field } from 'react-final-form'
import { FieldValidator } from 'final-form'
import FormTextInput, { FormTextInputProps } from './FormTextInput'

export interface FormTextInputFieldProps extends Omit<FormTextInputProps, 'input' | 'meta'> {
    readonly name: string
    readonly hint?: string
    readonly validate?: FieldValidator<string>
}

/**
 * Convenience wrapper around FormTextInput
 */
const FormTextInputField = ({ name, hint, validate, ...inputProps }: FormTextInputFieldProps) => (
    <Field<string> name={name} validate={validate}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {({ input, meta }) => <FormTextInput {...inputProps} hint={hint} input={input} meta={meta} />}
    </Field>
)

export default FormTextInputField
