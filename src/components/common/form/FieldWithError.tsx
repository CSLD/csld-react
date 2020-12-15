import React from 'react'
import { FieldMetaState } from 'react-final-form'
import { createUseStyles } from 'react-jss'
import { Form } from 'react-bootstrap'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    readonly controlId?: string
    readonly meta: FieldMetaState<any>
    readonly showErrorPlaceholder?: boolean
}

const useStyles = createUseStyles({
    errorHolder: {
        color: darkTheme.red,
        paddingLeft: 3,
    },
})

const FieldWithError: React.FC<Props> = ({ meta, showErrorPlaceholder = true, controlId, children }) => {
    const showError = (meta.touched || meta.modified) && meta.error
    const classes = useStyles()

    return (
        <Form.Group controlId={controlId}>
            {children}
            {(showError || showErrorPlaceholder) && (
                <Form.Text className={classes.errorHolder}>{showError ? meta.error : '\u00A0'}</Form.Text>
            )}
        </Form.Group>
    )
}

export default FieldWithError
