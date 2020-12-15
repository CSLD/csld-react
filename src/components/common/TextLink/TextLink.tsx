import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    readonly href?: string
    readonly className?: string
}

const useStyles = createUseStyles({
    link: {
        color: darkTheme.textGreenDark,
        fontSize: '0.85rem',

        '&:hover': {
            color: darkTheme.textGreenDark,
        },
    },
})

export const TextLink: React.FC<Props> = ({ href, className, children }) => {
    const classes = useStyles()

    return (
        <a href={href} className={classNames(classes.link, className)}>
            {children}
        </a>
    )
}
