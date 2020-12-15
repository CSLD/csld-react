import React from 'react'
import { Field } from 'react-final-form'
import FormCheckBox, { FormCheckBoxProps } from './FormCheckBox'

export interface FormCheckBoxFieldProps extends Omit<FormCheckBoxProps, 'input' | 'meta'> {
    readonly name: string
}

/**
 * Convenience wrapper around FormCheckBox
 */
const FormCheckBoxField = ({ name, ...inputProps }: FormCheckBoxFieldProps) => (
    <Field<boolean> name={name}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {({ input, meta }) => <FormCheckBox {...inputProps} input={input} meta={meta} />}
    </Field>
)

export default FormCheckBoxField
