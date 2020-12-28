import React, { MouseEventHandler, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'
import { Dropdown } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
import { UserContext } from 'src/context/UserContext/UserContext'
import { HeaderNavLink } from './HeaderNavLink'
import { darkTheme } from '../../../theme/darkTheme'
import { isAtLeastEditor } from '../../../utils/roleUtils'
import { useRoutes } from '../../../hooks/useRoutes'
import isInBrowser from 'is-in-browser'

const signOutMutation = require('./graphql/signOutMutation.graphql')

interface CustomToggleProps {
    userId: string
    userName: string
    imageId?: string
    onClick: MouseEventHandler<HTMLButtonElement>
}

const useStyles = createUseStyles({
    button: {
        background: 'transparent',
        fontSize: '0.75rem',
        color: darkTheme.text,
        padding: 3,
        border: 0,
        display: 'flex',
        alignItems: 'center',
        marginLeft: 8,

        '&:hover': {
            color: darkTheme.textGreen,
        },
    },
    image: {
        height: 18,
        width: 18,
        padding: 1,
        border: `solid 1px ${darkTheme.textOnLight}`,
        marginRight: 2,
        borderRadius: 2,
    },
})

const CustomToggle = React.forwardRef<HTMLButtonElement, CustomToggleProps>(
    ({ onClick, userId, userName, imageId }, ref) => {
        const classes = useStyles()

        return (
            <button
                type="button"
                ref={ref}
                className={classes.button}
                onClick={e => {
                    e.preventDefault()
                    onClick(e)
                }}
            >
                <img src={`/user-icon?id=${userId}&imageId=${imageId}`} className={classes.image} alt="" />
                &nbsp;
                {userName}
                &nbsp; &#x25bc;
            </button>
        )
    },
)

const HeaderUser = () => {
    const { t } = useTranslation('common')
    const routes = useRoutes()
    const client = useApolloClient()
    const userContext = useContext(UserContext)

    const user = userContext?.value

    const handleSelect = async (eventKey: any) => {
        if (eventKey === 'myPage') {
            routes.push(routes.currentProfile())
        }
        if (eventKey === 'settings') {
            routes.push(routes.userSettings())
        }
        if (eventKey === 'changePassword') {
            routes.push(routes.changePassword())
        }
        if (eventKey === 'admin') {
            routes.push(routes.adminMenu())
        }
        if (eventKey === 'logOut') {
            await client.mutate({
                mutation: signOutMutation,
            })

            client.resetStore()
            routes.push(routes.homepage())
        }
    }

    const loading = !isInBrowser || (user && !user.id)

    if (loading) {
        // Loading
        return null
    }

    if (user?.id) {
        return (
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle as={CustomToggle} userId={user.id} userName={user.name || ''} imageId={user.imageId} />

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="myPage">{t('PageHeader.myPage')}</Dropdown.Item>
                    <Dropdown.Item eventKey="settings">{t('PageHeader.settings')}</Dropdown.Item>
                    <Dropdown.Item eventKey="changePassword">{t('PageHeader.changePassword')}</Dropdown.Item>
                    {isAtLeastEditor(user.role) && (
                        <Dropdown.Item eventKey="admin">{t('PageHeader.admin')}</Dropdown.Item>
                    )}
                    <Dropdown.Item eventKey="logOut">{t('PageHeader.logOut')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <>
            <HeaderNavLink route={routes.signIn()}>{t('PageHeader.signIn')}</HeaderNavLink>
            <HeaderNavLink route={routes.signUp()}>{t('PageHeader.signUp')}</HeaderNavLink>
        </>
    )
}

export default HeaderUser
