import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'
import { Form as FinalForm } from 'react-final-form'
import { TFunction } from 'i18next'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { useRoutes } from 'src/hooks/useRoutes'
import { UrlObject } from 'url'
import FormPageRow from '../common/FormPageRow/FormPageRow'
import FormTextInputField from '../common/form/FormTextInputField'
import { darkTheme } from '../../theme/darkTheme'
import { fieldValidator, validateDate, validateEmail, validateRequired } from '../../utils/validationUtils'
import FormFileInputField from '../common/form/FormFileInputField'
import { CreateUserMutation, CreateUserMutationVariables } from '../../graphql/__generated__/typescript-operations'
import { TextLink } from '../common/TextLink/TextLink'
import ReCaptchaField from './ReCaptchaField'
import { convertDateInput, convertFileInput } from '../../utils/graphqlUtils'
import { useIsEmailAvailable } from '../../hooks/useIsEmailAvailable'

const createUserlGql = require(`./graphql/createUserMutation.graphql`)

const useStyles = createUseStyles({
    error: {
        color: darkTheme.red,
        marginBottom: 16,
    },
    rowFixer: {
        marginBottom: '-20px',
    },
})

interface FormData {
    email: string
    password: string
    passwordAgain: string
    name: string
    nickname: string
    city: string
    birthDate: string
    recaptcha: string
    profilePicture: string
}

type TState = 'idle' | 'loading' | 'error'

const validate = (t: TFunction) => (data: FormData) => {
    return {
        passwordAgain: data.password !== data.passwordAgain ? t('SignUp.passwordAgainError') : undefined,
    }
}

const EmailUsedErrorHint = ({ name, href, as }: { name: string; href: UrlObject; as: string }) => {
    const { t } = useTranslation('common')
    return (
        <Form.Text>
            {t('SignUp.emailAlreadyUsed', { name })}{' '}
            <TextLink href={href} as={as}>
                {t('SignUp.forgotPassword')}
            </TextLink>
            .
        </Form.Text>
    )
}

const SignUpPanel = () => {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const client = useApolloClient()
    const routes = useRoutes()
    const [state, setState] = useState<TState>('idle')
    const { usedByUser, isEmailAvailable } = useIsEmailAvailable()
    const { href: recoverHref, as: recoverAs } = routes.recoverPasswordStart()

    const onSubmit = async (data: FormData) => {
        setState('loading')

        const emailAvailable = await isEmailAvailable(data.email)
        if (!emailAvailable) {
            // Just return some error - display is done based on usedByName anyway
            setState('idle')
            return { emailAvailable: 'unavailable' }
        }

        const { passwordAgain, profilePicture, birthDate, ...inputBase } = data
        const variables: CreateUserMutationVariables = {
            input: {
                ...inputBase,
                birthDate: convertDateInput(birthDate),
                profilePicture: convertFileInput(profilePicture),
            },
        }

        const res = await client.mutate<CreateUserMutation, CreateUserMutationVariables>({
            mutation: createUserlGql,
            variables,
        })

        if (res.data?.user?.createUser?.id) {
            // Success - go to homepage
            await client.resetStore()
            routes.push(routes.homepage())
            return undefined
        }

        setState('error')
        return undefined
    }

    return (
        <FormPageRow headerText={t('SignUp.header')}>
            {state === 'error' && <div className={classes.error}>{t('SignUp.error')}</div>}
            <FinalForm<FormData>
                onSubmit={onSubmit}
                validate={validate(t)}
                render={({ handleSubmit, values }) => {
                    const handleEmailOnBlur = () => {
                        isEmailAvailable(values.email)
                    }

                    return (
                        <form onSubmit={handleSubmit}>
                            <FormTextInputField
                                name="email"
                                placeholder={t('UserFields.email')}
                                validate={fieldValidator(t, [validateRequired, validateEmail])}
                                onBlur={handleEmailOnBlur}
                                errorHint={
                                    usedByUser ? (
                                        <EmailUsedErrorHint name={usedByUser.name} href={recoverHref} as={recoverAs} />
                                    ) : (
                                        undefined
                                    )
                                }
                            />
                            <Row className={classes.rowFixer}>
                                <Col>
                                    <FormTextInputField
                                        name="password"
                                        type="password"
                                        placeholder={t('UserFields.password')}
                                        validate={fieldValidator(t, validateRequired)}
                                    />
                                </Col>
                                <Col>
                                    <FormTextInputField
                                        name="passwordAgain"
                                        type="password"
                                        placeholder={t('UserFields.passwordAgain')}
                                        validate={fieldValidator(t, validateRequired)}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <FormFileInputField
                                name="profilePicture"
                                sizeLimit={2000000}
                                placeholder={t('UserFields.profilePicture')}
                                hint={t('SignUp.profilePictureHint')}
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
                            <ReCaptchaField name="recaptcha" />
                            <Button variant="dark" type="submit" disabled={state === 'loading' || !!usedByUser}>
                                {t('SignUp.submit')}
                            </Button>
                        </form>
                    )
                }}
            />
        </FormPageRow>
    )
}

export default SignUpPanel
