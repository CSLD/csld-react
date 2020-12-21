import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { createUseStyles } from 'react-jss'
import { Form as FinalForm } from 'react-final-form'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import FormPageRow from '../common/FormPageRow/FormPageRow'
import FormTextInputField from '../common/form/FormTextInputField'
import { fieldValidator, validateDate, validateEmail, validateRequired } from '../../utils/validationUtils'
import FormFileInputField from '../common/form/FormFileInputField'
import { darkTheme } from '../../theme/darkTheme'
import {
    LoadCurrentUserSettingsQuery,
    UpdateUserSettingsMutation,
    UpdateUserSettingsMutationVariables,
} from '../../graphql/__generated__/typescript-operations'
import { useIsEmailAvailable } from '../../hooks/useIsEmailAvailable'
import { convertDateFromGraphql, convertDateInput, convertFileInput } from '../../utils/graphqlUtils'
import UserDetailPanel from './UserDetailPanel'
import UserProfileTabs from './UserProfileTabs'

const loadUserSettingsGql = require('./graphql/loadCurrentUserSettings.graphql')
const updateUserSettingsGql = require('./graphql/updateUserSettings.graphql')
// const refreshUserGql = require('../common/PageHeader/graphql/loggedInUserQuery.graphql')

const useStyles = createUseStyles({
    error: {
        color: darkTheme.red,
        marginBottom: 16,
    },
})

interface FormData {
    email: string
    name: string
    nickname: string
    city: string
    birthDate: string
    profilePicture: string
}

type TState = 'idle' | 'loading' | 'error'

const UserSettingsPanel = () => {
    const loadQuery = useQuery<LoadCurrentUserSettingsQuery>(loadUserSettingsGql)
    const client = useApolloClient()
    const { t } = useTranslation('common')
    const classes = useStyles()
    const router = useRouter()
    const [state, setState] = useState<TState>('idle')
    const { usedByName, isEmailAvailable } = useIsEmailAvailable()
    const loggedInUser = loadQuery.data?.loggedInUser

    const onSubmit = async (data: FormData) => {
        setState('loading')

        const emailAvailable = await isEmailAvailable(data.email, loggedInUser?.id)
        if (!emailAvailable) {
            // Just return some error - display is done based on usedByName anyway
            setState('idle')
            return { emailAvailable: 'unavailable' }
        }

        const { profilePicture, birthDate, ...inputBase } = data
        const variables: UpdateUserSettingsMutationVariables = {
            input: {
                ...inputBase,
                birthDate: convertDateInput(birthDate),
                profilePicture: convertFileInput(profilePicture),
            },
        }

        await client.mutate<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>({
            mutation: updateUserSettingsGql,
            variables,
        })

        // Success - go to profile
        router.push({ pathname: '/profile', query: { id: 'current' } }, '/profile/current')
        return undefined
    }

    const initialValues = loggedInUser && {
        email: loggedInUser.email,
        name: loggedInUser.name,
        nickname: loggedInUser.nickname || undefined,
        city: loggedInUser.city || undefined,
        birthDate: convertDateFromGraphql(loggedInUser.birthDate),
    }

    return (
        <>
            <UserDetailPanel userData={loggedInUser ?? undefined} />
            <UserProfileTabs selectedTab="settings" />
            <FormPageRow headerText={t('UserSettings.header')}>
                {state === 'error' && <div className={classes.error}>{t('UserSettings.error')}</div>}
                {initialValues && loggedInUser && (
                    <FinalForm<FormData>
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        render={({ handleSubmit, values }) => {
                            const handleEmailOnBlur = () => {
                                isEmailAvailable(values.email, loggedInUser.id)
                            }

                            return (
                                <form onSubmit={handleSubmit}>
                                    <FormTextInputField
                                        name="email"
                                        placeholder={t('UserFields.email')}
                                        validate={fieldValidator(t, [validateRequired, validateEmail])}
                                        onBlur={handleEmailOnBlur}
                                        errorHint={
                                            usedByName ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {t('UserSettings.emailAlreadyUsed', { name: usedByName })}
                                                </Form.Control.Feedback>
                                            ) : (
                                                undefined
                                            )
                                        }
                                    />
                                    <hr />
                                    <FormFileInputField
                                        name="profilePicture"
                                        sizeLimit={2000000}
                                        placeholder={t('UserFields.profilePicture')}
                                        hint={t('UserSettings.profilePictureHint')}
                                    />
                                    <Row>
                                        <Col>
                                            <FormTextInputField
                                                name="name"
                                                placeholder={t('UserFields.name')}
                                                hint={t('UserFields.nameHint')}
                                                validate={fieldValidator(t, validateRequired)}
                                            />
                                        </Col>
                                        <Col>
                                            <FormTextInputField
                                                name="nickname"
                                                placeholder={t('UserFields.nickName')}
                                                hint={t('UserFields.nickNameHint')}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormTextInputField
                                                name="city"
                                                placeholder={t('UserFields.city')}
                                                hint={t('UserFields.cityHint')}
                                            />
                                        </Col>
                                        <Col>
                                            <FormTextInputField
                                                name="birthDate"
                                                placeholder={t('UserFields.birthDate')}
                                                hint={t('UserFields.birthDateHint')}
                                                validate={fieldValidator(t, validateDate)}
                                            />
                                        </Col>
                                    </Row>
                                    <Button variant="dark" type="submit" disabled={state === 'loading' || !!usedByName}>
                                        {t('UserSettings.submit')}
                                    </Button>
                                </form>
                            )
                        }}
                    />
                )}
            </FormPageRow>
        </>
    )
}

export default UserSettingsPanel
