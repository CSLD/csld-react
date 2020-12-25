import React from 'react'
import { useField } from 'react-final-form'
import { Form } from 'react-bootstrap'
import { FieldValidator } from 'final-form'
import { Label } from '../../../graphql/__generated__/typescript-operations'

interface Props {
    readonly name: string
    readonly labels: Array<Pick<Label, 'id' | 'name' | 'description'>>
    readonly validate?: FieldValidator<string[]>
}

const FormLabelListField = ({ name, labels, validate }: Props) => {
    const {
        input: { value, onChange },
        meta: { error, submitFailed },
    } = useField<string[]>(name, { validate })

    const hasError = !!error && submitFailed

    const handleChange = (id: string) => () => {
        const index = value.indexOf(id)
        let newValue: string[]
        if (index >= 0) {
            newValue = value.filter(oldId => oldId !== id)
        } else {
            newValue = [...value, id]
        }
        onChange({ target: { value: newValue } })
    }

    const lastIndex = labels.length - 1

    return (
        <Form.Group>
            {labels.map((label, index) => (
                <Form.Check key={label.id} isInvalid={hasError} type={'checkbox' as any}>
                    <Form.Check.Input
                        type={'checkbox' as any}
                        isInvalid={hasError}
                        checked={value.includes(label.id)}
                        onChange={handleChange(label.id)}
                    />
                    <Form.Check.Label>{label.name}</Form.Check.Label>
                    {index === lastIndex && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
                </Form.Check>
            ))}
        </Form.Group>
    )
}

export default FormLabelListField
