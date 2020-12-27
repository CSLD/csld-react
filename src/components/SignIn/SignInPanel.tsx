import React, { useContext, useState } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
import { TFunction } from 'i18next'
import { useApolloClient } from '@apollo/client'
import { UserContext } from 'src/context/UserContext/UserContext'
import FormTextInputField from '../common/form/FormTextInputField'
import { darkTheme } from '../../theme/darkTheme'
import { validateEmail, validateRequired, validateWithValidators } from '../../utils/validationUtils'
import { LogInMutation, LogInMutationVariables } from '../../graphql/__generated__/typescript-operations'
import { TextLink } from '../common/TextLink/TextLink'
import FormPageRow from '../common/FormPageRow/FormPageRow'
import { useRoutes } from '../../hooks/useRoutes'
import { useFocusInput } from '../../hooks/useFocusInput'

const logInMutation = require('./graphql/logInMutation.graphql')

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

type TState = 'idle' | 'loading' | 'error'

const SignInPanel = () => {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const client = useApolloClient()
    const routes = useRoutes()
    const formRef = useFocusInput<HTMLFormElement>('email')
    const [state, setState] = useState<TState>('idle')
    const userContext = useContext(UserContext)

    const onSubmit = async (data: FormData) => {
        setState('loading')
        const res = await client.mutate<LogInMutation, LogInMutationVariables>({
            mutation: logInMutation,
            variables: {
                userName: data.email,
                password: data.password,
            },
        })

        if (res.data?.user?.logIn) {
            // Success

            // Go to homepage
            userContext?.actions?.reload()
            routes.push(routes.homepage())
            return
        }

        setState('error')
    }
    const { href: recoverHref, as: recoverAs } = routes.recoverPasswordStart()

    return (
        <FormPageRow headerText={t('SignIn.header')}>
            {state === 'error' && <div className={classes.error}>{t('SignIn.error')}</div>}
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
                        <Button variant="dark" type="submit" disabled={state === 'loading'}>
                            {t('SignIn.submit')}
                        </Button>
                    </form>
                )}
            />
        </FormPageRow>
    )
}

export default SignInPanel
