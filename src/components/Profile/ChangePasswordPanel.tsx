import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Form as FinalForm } from 'react-final-form'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { createUseStyles } from 'react-jss'
import FormPageRow from '../common/FormPageRow/FormPageRow'
import FormTextInputField from '../common/form/FormTextInputField'
import { fieldValidator, validateRequired } from '../../utils/validationUtils'
import {
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
    LoadCurrentUserSettingsQuery,
} from '../../graphql/__generated__/typescript-operations'
import UserDetailPanel from './UserDetailPanel'
import UserProfileTabs from './UserProfileTabs'
import { darkTheme } from '../../theme/darkTheme'

const loadUserSettingsGql = require('./graphql/loadCurrentUserSettings.graphql')
const changePasswordGql = require('./graphql/changePassword.graphql')

interface FormData {
    oldPassword: string
    newPassword: string
    newPasswordAgain: string
}

type TState = 'idle' | 'loading' | 'oldPasswordError' | 'otherError'

const validate = (t: TFunction) => (data: FormData) => {
    return {
        newPasswordAgain:
            data.newPassword !== data.newPasswordAgain ? t('ChangePassword.passwordAgainError') : undefined,
    }
}

const useStyles = createUseStyles({
    error: {
        color: darkTheme.red,
        marginBottom: 16,
    },
})

const ChangePasswordPanel = () => {
    const loadQuery = useQuery<LoadCurrentUserSettingsQuery>(loadUserSettingsGql)
    const client = useApolloClient()
    const { t } = useTranslation('common')
    const router = useRouter()
    const [state, setState] = useState<TState>('idle')
    const loggedInUser = loadQuery.data?.loggedInUser
    const classes = useStyles()

    const onSubmit = async (data: FormData) => {
        setState('loading')
        const variables: ChangePasswordMutationVariables = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        }

        client
            .mutate<ChangePasswordMutation, ChangePasswordMutationVariables>({
                mutation: changePasswordGql,
                variables,
            })
            .then(() => {
                // Success - go to profile
                router.push({ pathname: '/profile', query: { id: 'current' } }, '/profile/current')
            })
            .catch(e => {
                if (e?.graphQLErrors?.[0]?.extensions?.path) {
                    setState('oldPasswordError')
                } else {
                    setState('otherError')
                }
            })
    }

    return (
        <>
            <UserDetailPanel userData={loggedInUser ?? undefined} />
            <UserProfileTabs selectedTab="changePassword" />
            <FormPageRow headerText={t('ChangePassword.header')}>
                {state === 'oldPasswordError' && (
                    <div className={classes.error}>{t('ChangePassword.oldPasswordError')}</div>
                )}
                {state === 'otherError' && <div className={classes.error}>{t('ChangePassword.error')}</div>}
                <FinalForm<FormData>
                    onSubmit={onSubmit}
                    validate={validate(t)}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <FormTextInputField
                                name="oldPassword"
                                type="password"
                                placeholder={t('ChangePassword.oldPassword')}
                                validate={fieldValidator(t, validateRequired)}
                            />
                            <FormTextInputField
                                name="newPassword"
                                type="password"
                                placeholder={t('ChangePassword.newPassword')}
                                validate={fieldValidator(t, validateRequired)}
                            />
                            <FormTextInputField
                                name="newPasswordAgain"
                                type="password"
                                placeholder={t('ChangePassword.newPasswordAgain')}
                                validate={fieldValidator(t, validateRequired)}
                            />
                            <Button variant="dark" type="submit" disabled={state === 'loading'}>
                                {t('ChangePassword.submit')}
                            </Button>
                        </form>
                    )}
                />
            </FormPageRow>
        </>
    )
}

export default ChangePasswordPanel
