import React from 'react'
import { Field } from 'react-final-form'
import FormTextInput, { FormTextInputProps } from './FormTextInput'

export interface FormTextInputFieldProps extends Omit<FormTextInputProps, 'input' | 'meta'> {
    readonly name: string
}

/**
 * Convenience wrapper around FormTextInput
 */
const FormTextInputField = ({ name, ...inputProps }: FormTextInputFieldProps) => (
    <Field<string> name={name}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {({ input, meta }) => <FormTextInput {...inputProps} input={input} meta={meta} />}
    </Field>
)

export default FormTextInputField
