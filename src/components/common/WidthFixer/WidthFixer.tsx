import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { breakPoints } from '../../../theme/breakPoints'

interface Props {
    readonly className?: string
}

const useStyles = createUseStyles({
    widthFixer: {
        margin: '0 auto',
        padding: '0 15px',
        boxSizing: 'border-box',
        width: '100%',
    },
    [`@media(min-width: ${breakPoints.xl}px)`]: {
        widthFixer: {
            width: breakPoints.xl,
        },
    },
})

export const WidthFixer: React.FC<Props> = ({ className, children }) => {
    const classes = useStyles()

    return <div className={classNames(classes.widthFixer, className)}>{children}</div>
}
