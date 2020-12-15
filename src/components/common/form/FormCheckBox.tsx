import React from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'
import { Form } from 'react-bootstrap'
import FieldWithError from './FieldWithError'

export interface FormCheckBoxProps {
    readonly input: FieldInputProps<boolean>
    readonly meta: FieldMetaState<boolean>
    readonly showErrorPlaceholder?: boolean
    readonly label: string
}

const FormCheckBox = ({ input, label, meta, showErrorPlaceholder }: FormCheckBoxProps) => {
    return (
        <FieldWithError meta={meta} showErrorPlaceholder={showErrorPlaceholder}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Form.Check type={'checkbox' as any} label={label} {...input} />
        </FieldWithError>
    )
}

export default FormCheckBox
