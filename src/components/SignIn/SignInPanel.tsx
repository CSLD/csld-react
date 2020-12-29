import React from 'react'
import { Form as FinalForm } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
import { TFunction } from 'i18next'
import { useApolloClient, useMutation } from '@apollo/client'
import FormTextInputField from '../common/form/FormTextInputField'
import { darkTheme } from '../../theme/darkTheme'
import { validateEmail, validateRequired, validateWithValidators } from '../../utils/validationUtils'
import { LogInMutation, LogInMutationVariables } from '../../graphql/__generated__/typescript-operations'
import { TextLink } from '../common/TextLink/TextLink'
import FormPageRow from '../common/FormPageRow/FormPageRow'
import { useRoutes } from '../../hooks/useRoutes'
import { useFocusInput } from '../../hooks/useFocusInput'

const logInMutationGql = require('./graphql/logInMutation.graphql')

interface FormData {
    email: string
    password: string
    keepLoggedIn: boolean
}

const useStyles = createUseStyles({
    error: {
        color: darkTheme.red,
        marginBottom: 16,
    },
    recoverPassword: {
        marginBottom: 20,
    },
})

const validate = (t: TFunction) => (data: FormData) =>
    validateWithValidators(
        data,
        {
            email: [validateRequired, validateEmail],
            password: validateRequired,
        },
        t,
    )

interface Props {
    readonly infoMessage?: string
    readonly stayOnPage?: boolean
    readonly onSuccess?: () => void
}

const SignInPanel = ({ infoMessage, stayOnPage, onSuccess }: Props) => {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const client = useApolloClient()
    const [logInMutation, { loading }] = useMutation<LogInMutation, LogInMutationVariables>(logInMutationGql)
    const routes = useRoutes()
    const formRef = useFocusInput<HTMLFormElement>('email')

    const onSubmit = async (data: FormData) => {
        const res = await logInMutation({
            variables: {
                userName: data.email,
                password: data.password,
            },
        })

        if (res.data?.user?.logIn) {
            // Success

            // Clear GraphQL cache
            await client.resetStore()

            // Call callback
            onSuccess?.()

            if (!stayOnPage) {
                // Ho to homepage
                routes.push(routes.homepage())
            }
        }
    }
    const { href: recoverHref, as: recoverAs } = routes.recoverPasswordStart()

    return (
        <FormPageRow headerText={infoMessage || t('SignIn.header')}>
            <FinalForm<FormData>
                onSubmit={onSubmit}
                validate={validate(t)}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <FormTextInputField name="email" placeholder={t('SignIn.email')} />
                        <FormTextInputField name="password" type="password" placeholder={t('SignIn.password')} />
                        {/* <FormCheckBoxField
                                name="keepLoggedIn"
                                label={t('SignIn.keepLoggedIn')}
                                showErrorPlaceholder={false}
                            /> */}
                        <div className={classes.recoverPassword}>
                            <TextLink href={recoverHref} as={recoverAs}>
                                {t('SignIn.forgotPassword')}
                            </TextLink>
                        </div>
                        <Button variant="dark" type="submit" disabled={loading}>
                            {t('SignIn.submit')}
                        </Button>
                    </form>
                )}
            />
        </FormPageRow>
    )
}

export default SignInPanel
