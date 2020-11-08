import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

interface Props {
    readonly className?: string
}

const useStyles = createUseStyles({
    // TODO: Make width responsive
    widthFixer: {
        width: 1200,
        margin: '0 auto',
    },
})

export const WidthFixer: React.FC<Props> = ({ className, children }) => {
    const classes = useStyles()

    return <div className={classNames(classes.widthFixer, className)}>{children}</div>
}
