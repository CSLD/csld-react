import React, { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient, useQuery } from '@apollo/client'
import { Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { createUseStyles } from 'react-jss'
import { HeaderNavLink } from './HeaderNavLink'
import { LoggedInUserQuery, UserRole } from '../../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../../theme/darkTheme'

const loggedInUserQuery = require('./graphql/loggedInUserQuery.graphql')
const signOutMutation = require('./graphql/signOutMutation.graphql')

interface CustomToggleProps {
    userId: string
    userName: string
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

const CustomToggle = React.forwardRef<HTMLButtonElement, CustomToggleProps>(({ onClick, userId, userName }, ref) => {
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
            <img src={`/user-icon?id=${userId}`} className={classes.image} alt="" />
            &nbsp;
            {userName}
            &nbsp; &#x25bc;
        </button>
    )
})

const HeaderUser = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const client = useApolloClient()

    const loggedInQueryResult = useQuery<LoggedInUserQuery>(loggedInUserQuery, { fetchPolicy: 'network-only' })

    const user = loggedInQueryResult.data?.loggedInUser

    const handleSelect = async (eventKey: any) => {
        if (eventKey === 'myPage') {
            router.push('/userDetail')
        }
        if (eventKey === 'settings') {
            router.push('/settings')
        }
        if (eventKey === 'changePassword') {
            router.push('/settings/changePassword')
        }
        if (eventKey === 'admin') {
            router.push('/admin')
        }
        if (eventKey === 'logOut') {
            await client.mutate({
                mutation: signOutMutation,
            })

            loggedInQueryResult.refetch()
            router.push('/homepage', '/')
        }
    }

    if (user) {
        const showAdminMenu = user.role === UserRole.Admin || user.role === UserRole.Editor

        return (
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle as={CustomToggle} userId={user.id} userName={user.person.name} />

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="myPage">{t('PageHeader.myPage')}</Dropdown.Item>
                    <Dropdown.Item eventKey="settings">{t('PageHeader.settings')}</Dropdown.Item>
                    <Dropdown.Item eventKey="changePassword">{t('PageHeader.changePassword')}</Dropdown.Item>
                    {showAdminMenu && <Dropdown.Item eventKey="admin">{t('PageHeader.admin')}</Dropdown.Item>}
                    <Dropdown.Item eventKey="logOut">{t('PageHeader.logOut')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    if (loggedInQueryResult.loading) {
        return null
    }

    return (
        <>
            <HeaderNavLink href="/signIn" as="/signIn">
                {t('PageHeader.signIn')}
            </HeaderNavLink>
            <HeaderNavLink href="/signUp" as="/signUp">
                {t('PageHeader.signUp')}
            </HeaderNavLink>
        </>
    )
}

export default HeaderUser
