import React from 'react'
import { Button } from 'react-bootstrap'
import { IconLoading } from '../Icons/Icons'

interface Props {
    readonly submitting: boolean
    readonly disabled?: boolean
}

const SubmitButton: React.FC<Props> = ({ submitting, disabled, children }) => (
    <Button variant="dark" type="submit" disabled={submitting || disabled}>
        {submitting && (
            <>
                <IconLoading />
                &nbsp;
            </>
        )}
        {children}
    </Button>
)

export default SubmitButton
