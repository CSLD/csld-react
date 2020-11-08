import React from 'react'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    href: string
    target?: string
}

const useStyles = createUseStyles({
    link: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 15px',
        color: darkTheme.text,
        fontSize: '0.8rem',

        '&:hover': {
            color: darkTheme.textGreen,
        },
    },
})

export const HeaderNavLink: React.FC<Props> = ({ href, target, children }) => {
    const classes = useStyles()

    return (
        <a className={classes.link} href={href} target={target}>
            {children}
        </a>
    )
}
