import React from 'react'
import { createUseStyles } from 'react-jss'
import Link from 'next/link'
import { darkTheme } from '../../../theme/darkTheme'
import { Route } from '../../../hooks/useRoutes'
import { useHideInPlaceLogin } from '../../../hooks/useHideInPlaceLogin'

interface Props {
    readonly route: string | Route
    readonly target?: string
}

export const headerLinkStyle = {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px',
    color: darkTheme.text,
    fontSize: '0.8rem',
    border: 0,
    background: 'transparent',

    '&:hover': {
        color: darkTheme.textGreen,
    },
}

const useStyles = createUseStyles({
    link: headerLinkStyle,
})

export const HeaderNavLink: React.FC<Props> = ({ route, target, children }) => {
    const classes = useStyles()

    // When link is clicked, we need to hide in-place login, so user sees page content
    const hideInPlaceLogin = useHideInPlaceLogin()

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
            <a href="/" className={classes.link} onClick={hideInPlaceLogin}>
                {children}
            </a>
        </Link>
    )
}
