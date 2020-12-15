import React from 'react'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../../theme/darkTheme'
import { WidthFixer } from '../WidthFixer/WidthFixer'

const useStyles = createUseStyles({
    row: {
        backgroundColor: darkTheme.backgroundNearWhite,
        padding: '16px 0',
    },
    form: {
        backgroundColor: darkTheme.backgroundWhite,
        padding: 20,
    },
})

/**
 * Creates row with form on pages that contain (just) a form
 */
const FormPageRow: React.FC = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.row}>
            <WidthFixer className={classes.form}>{children}</WidthFixer>
        </div>
    )
}

export default FormPageRow
