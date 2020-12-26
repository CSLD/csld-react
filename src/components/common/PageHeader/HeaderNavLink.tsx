import React from 'react'
import { createUseStyles } from 'react-jss'
import Link from 'next/link'
import { darkTheme } from '../../../theme/darkTheme'
import { Route } from '../../../hooks/useRoutes'

interface Props {
    readonly route: string | Route
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

export const HeaderNavLink: React.FC<Props> = ({ route, target, children }) => {
    const classes = useStyles()

    if (typeof route === 'string') {
        // External link
        return (
            <a className={classes.link} href={route} target={target}>
                {children}
            </a>
        )
    }

    return (
        <Link href={route.href} as={route.as} passHref>
            <a href="/" className={classes.link}>
                {children}
            </a>
        </Link>
    )
}
