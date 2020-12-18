import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { Form as FinalForm } from 'react-final-form'
import { Button } from 'react-bootstrap'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { TFunction } from 'i18next'
import FormPageRow from '../common/FormPageRow/FormPageRow'
import { darkTheme } from '../../theme/darkTheme'
import FormTextInputField from '../common/form/FormTextInputField'
import { validateRequired, validateWithValidators } from '../../utils/validationUtils'
import {
    FinishRecoverPasswordMutation,
    FinishRecoverPasswordMutationVariables,
} from '../../graphql/__generated__/typescript-operations'

interface Props {
    readonly token: string
}

const finishRecoverPasswordGQL = require('./graphql/finishRecoverPasswordMutation.graphql')

const useStyles = createUseStyles({
    error: {
        color: darkTheme.red,
        marginBottom: 16,
    },
})

type TState = 'initial' | 'loading' | 'error'

interface FormData {
    readonly password: string
    readonly passwordConfirmation: string
}

const validate = (t: TFunction) => (data: FormData) => {
    const res = validateWithValidators(
        data,
        {
            password: validateRequired,
        },
        t,
    )

    if (data.passwordConfirmation !== data.password) {
        res.passwordConfirmation = t('RecoverPassword.passwordConfirmationError')
    }

    return res
}

const RecoverPasswordFinish = ({ token }: Props) => {
    const { t } = useTranslation('common')
    const [state, setState] = useState<TState>('initial')
    const classes = useStyles()
    const client = useApolloClient()
    const router = useRouter()

    const onSubmit = ({ password }: FormData) => {
        setState('loading')

        client
            .mutate<FinishRecoverPasswordMutation, FinishRecoverPasswordMutationVariables>({
                mutation: finishRecoverPasswordGQL,
                variables: {
                    newPassword: password,
                    token,
                },
            })
            .catch(() => {
                setState('error')
            })
            .then(() => {
                // Success
                router.push('/homepage', '/')
            })
    }

    return (
        <FormPageRow headerText={t('RecoverPassword.header')}>
            {state === 'error' && <div className={classes.error}>{t('RecoverPassword.changeError')}</div>}
            <FinalForm<FormData>
                onSubmit={onSubmit}
                validate={validate(t)}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FormTextInputField
                            name="password"
                            type="password"
                            placeholder={t('RecoverPassword.password')}
                        />
                        <FormTextInputField
                            name="passwordConfirmation"
                            type="password"
                            placeholder={t('RecoverPassword.passwordConfirmation')}
                        />

                        <Button variant="dark" type="submit" disabled={state === 'loading'}>
                            {t('RecoverPassword.submit')}
                        </Button>
                    </form>
                )}
            />
        </FormPageRow>
    )
}

export default RecoverPasswordFinish
