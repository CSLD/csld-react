import React from 'react'
import { Field } from 'react-final-form'
import FormFileInput, { FormFileInputProps } from './FormFileInput'

export interface FormFileInputFieldProps extends Omit<FormFileInputProps, 'input' | 'meta'> {
    readonly name: string
}

/**
 * Convenience wrapper around FormTextInput
 */
const FormFileInputField = ({ name, hint, ...inputProps }: FormFileInputFieldProps) => (
    <Field<string> name={name}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {({ input, meta }) => <FormFileInput {...inputProps} hint={hint} input={input} meta={meta} />}
    </Field>
)

export default FormFileInputField
