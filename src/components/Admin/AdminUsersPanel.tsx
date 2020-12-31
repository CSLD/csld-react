import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import isInBrowser from 'is-in-browser'
import { createUseStyles } from 'react-jss'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {
    AdminUserFieldsFragment,
    DeleteUserMutation,
    DeleteUserMutationVariables,
    LoadAllUsersQuery,
    UpdateUserRoleMutation,
    UpdateUserRoleMutationVariables,
    UserRole,
    UserRoleIn,
} from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'
import BigLoading from '../common/BigLoading/BigLoading'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import UserLink from '../common/UserLink/UserLink'
import { useFocusInput } from '../../hooks/useFocusInput'
import ConfirmationModal from '../common/ConfirmationModal/ConfirmationModal'
import AdminTabs from './AdminTabs'

const loadAllUsersGql = require('./graphql/loadAllUsers.graphql')
const updateUserRoleGql = require('./graphql/updateUserRole.graphql')
const deleteUserGql = require('./graphql/deleteUser.graphql')

const useStyles = createUseStyles({
    row: {
        backgroundColor: darkTheme.backgroundWhite,
        padding: '20px 0',
    },
    formRow: {
        backgroundColor: darkTheme.backgroundRealWhite,
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 20px',
        padding: '10px 20px',
    },
    checkBox: {
        flexShrink: 0,
        marginLeft: 20,
    },
    userRow: {
        backgroundColor: darkTheme.backgroundRealWhite,
        display: 'flex',
        alignItems: 'center',
        margin: '4px 0',
        padding: '4px 20px',
    },
    moreUsersRow: {
        margin: '20px 0 0',
        textAlign: 'center',
    },
    nick: {
        width: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    name: {
        width: 400,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: '0 10px',
    },
    loading: {
        opacity: 0.5,
    },
    controls: {
        display: 'flex',
    },
})

const filterUsers = (users: AdminUserFieldsFragment[], filterPrivileged: boolean, filterName: string) =>
    users
        .filter(user => {
            if (filterPrivileged && user.role !== UserRole.Admin && user.role !== UserRole.Editor) {
                return false
            }

            if (filterName) {
                if (
                    !user.name.toLocaleLowerCase().includes(filterName) &&
                    !user.nickname?.toLocaleLowerCase().includes(filterName)
                ) {
                    return false
                }
            }

            return true
        })
        .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))

const limitUsers = (users: AdminUserFieldsFragment[], limit: number) => {
    if (limit >= users.length) {
        return users
    }
    return users.slice(0, limit)
}

const initialUserLimit = 50

const AdminUserPanel = () => {
    const { t } = useTranslation('common')
    const formRef = useFocusInput<HTMLDivElement>('name')
    const [filterPrivileged, setFilterPrivileged] = useState(false)
    const [filterName, setFilterName] = useState('')
    const [showAllResults, setShowAllResults] = useState(false)
    const [toDeleteUserId, setToDeleteUserId] = useState('')
    const debounceTimerRef = useRef(0)
    const classes = useStyles()
    const { data, loading, refetch } = useQuery<LoadAllUsersQuery>(loadAllUsersGql, {
        skip: !isInBrowser,
        fetchPolicy: 'cache-and-network',
    })
    const [updateRoleMutation, { loading: updateRoleLoading }] = useMutation<
        UpdateUserRoleMutation,
        UpdateUserRoleMutationVariables
    >(updateUserRoleGql)
    const [deleteUserMutation, { loading: deleteUserLoading }] = useMutation<
        DeleteUserMutation,
        DeleteUserMutationVariables
    >(deleteUserGql)

    const allUsers = data?.admin?.allUsers || []
    const filteredUsers = useMemo(() => filterUsers(allUsers, filterPrivileged, filterName), [
        allUsers,
        filterPrivileged,
        filterName,
    ])
    const shownUsers = useMemo(() => (showAllResults ? filteredUsers : limitUsers(filteredUsers, initialUserLimit)), [
        filteredUsers,
        showAllResults,
    ])

    const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (debounceTimerRef.current) {
            window.clearTimeout(debounceTimerRef.current)
        }
        debounceTimerRef.current = window.setTimeout(() => {
            setShowAllResults(false)
            setFilterName(value.toLocaleLowerCase())
        }, 500)
    }

    const handleChangePrivileged = () => {
        setShowAllResults(false)
        setFilterPrivileged(old => !old)
    }

    const handleShowAll = () => setShowAllResults(true)

    const handleChangeRole = (userId: string, role: UserRoleIn) => async () => {
        const res = await updateRoleMutation({
            variables: {
                userId,
                role,
            },
        })

        if (res.data) {
            refetch()
        }
    }

    const handleDeleteUser = (userId: string) => () => {
        setToDeleteUserId(userId)
    }

    const handleHideDialog = () => {
        setToDeleteUserId('')
    }

    const handleConfirmDialog = async () => {
        const res = await deleteUserMutation({ variables: { userId: toDeleteUserId } })
        if (res.data) {
            refetch()
            setToDeleteUserId('')
        }
    }

    const isLoading = loading || updateRoleLoading || deleteUserLoading

    return (
        <>
            <AdminTabs selectedTab="users" />

            <div className={classes.row}>
                <WidthFixer className={isLoading && filteredUsers.length > 0 ? classes.loading : undefined}>
                    <div className={classes.formRow} ref={formRef}>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder={t('AdminUsers.filterPlaceholder')}
                            onChange={handleChangeFilter}
                        />
                        <Form.Check
                            className={classes.checkBox}
                            type="checkbox"
                            id="adminsAndEditors"
                            label={t('AdminUsers.showPrivileged')}
                            onChange={handleChangePrivileged}
                        />
                    </div>
                    {isLoading && filteredUsers.length === 0 && <BigLoading />}
                    {(!isLoading || filteredUsers.length > 0) && (
                        <>
                            {shownUsers.map(user => (
                                <div className={classes.userRow} key={user.id}>
                                    <div className={classes.nick}>{user.nickname || ''}</div>
                                    <div className={classes.name}>
                                        <UserLink userId={user.id}>{user.name}</UserLink>
                                    </div>
                                    <div className={classes.controls}>
                                        <DropdownButton variant="dark" title={t(`UserRole.${user.role}`)}>
                                            <Dropdown.Item onSelect={handleChangeRole(user.id, UserRoleIn.User)}>
                                                {t('UserRole.USER')}
                                            </Dropdown.Item>
                                            <Dropdown.Item onSelect={handleChangeRole(user.id, UserRoleIn.Editor)}>
                                                {t('UserRole.EDITOR')}
                                            </Dropdown.Item>
                                            <Dropdown.Item onSelect={handleChangeRole(user.id, UserRoleIn.Admin)}>
                                                {t('UserRole.ADMIN')}
                                            </Dropdown.Item>
                                        </DropdownButton>
                                        &nbsp;
                                        <Button variant="dark" onClick={handleDeleteUser(user.id)}>
                                            {t('AdminUsers.delete')}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {filteredUsers.length > shownUsers.length && (
                                <div className={classes.moreUsersRow}>
                                    <Button variant="dark" onClick={handleShowAll}>
                                        {t('AdminUsers.showAll', { recordCount: filteredUsers.length })}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </WidthFixer>
                <ConfirmationModal
                    show={!!toDeleteUserId}
                    content={<span>{t('AdminUsers.deleteConfirm')}</span>}
                    onHide={handleHideDialog}
                    onCancel={handleHideDialog}
                    onConfirm={handleConfirmDialog}
                    loading={deleteUserLoading}
                />
            </div>
        </>
    )
}

export default AdminUserPanel