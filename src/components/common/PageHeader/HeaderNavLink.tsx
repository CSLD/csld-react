import React from 'react'
import { createUseStyles } from 'react-jss'
import Link from 'next/link'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    readonly href: string
    readonly as?: string
    readonly target?: string
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

export const HeaderNavLink: React.FC<Props> = ({ href, as, target, children }) => {
    const classes = useStyles()

    if (target) {
        // External link
        return (
            <a className={classes.link} href={href} target={target}>
                {children}
            </a>
        )
    }

    return (
        <Link href={href} as={as} passHref>
            <a href="/" className={classes.link}>
                {children}
            </a>
        </Link>
    )
}
