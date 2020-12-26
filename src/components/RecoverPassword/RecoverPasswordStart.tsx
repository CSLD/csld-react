import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'
import { Form as FinalForm } from 'react-final-form'
import { TFunction } from 'i18next'
import { Button } from 'react-bootstrap'
import { darkTheme } from '../../theme/darkTheme'
import FormTextInputField from '../common/form/FormTextInputField'
import { validateEmail, validateRequired, validateWithValidators } from '../../utils/validationUtils'
import {
    StartRecoverPasswordMutation,
    StartRecoverPasswordMutationVariables,
} from '../../graphql/__generated__/typescript-operations'
import FormPageRow from '../common/FormPageRow/FormPageRow'

const startRecoverPasswordGQL = require('./graphql/startRecoverPasswordMutation.graphql')

const useStyles = createUseStyles({
    sent: {
        marginBottom: 16,
    },
    error: {
        color: darkTheme.red,
        marginBottom: 16,
    },
})

interface FormData {
    email: string
}

const validate = (t: TFunction) => (data: FormData) =>
    validateWithValidators(
        data,
        {
            email: [validateRequired, validateEmail],
        },
        t,
    )

type TState = 'initial' | 'loading' | 'sent' | 'error'

const RecoverPasswordStart = () => {
    const { t } = useTranslation('common')
    const classes = useStyles()
    const client = useApolloClient()
    const [state, setState] = useState<TState>('initial')

    const onSubmit = async ({ email }: FormData) => {
        setState('loading')

        const recoverUrl = `${window.location}/`
        const res = await client.mutate<StartRecoverPasswordMutation, StartRecoverPasswordMutationVariables>({
            mutation: startRecoverPasswordGQL,
            variables: { email, recoverUrl },
        })

        setState(res.data?.user?.startRecoverPassword ? 'sent' : 'error')
    }

    return (
        <FormPageRow headerText={t('RecoverPassword.header')}>
            {state === 'sent' && <div className={classes.sent}>{t('RecoverPassword.sent')}</div>}
            {state === 'error' && <div className={classes.error}>{t('RecoverPassword.error')}</div>}
            <FinalForm<FormData>
                onSubmit={onSubmit}
                validate={validate(t)}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FormTextInputField name="email" placeholder={t('RecoverPassword.email')} />

                        <Button variant="dark" type="submit" disabled={state === 'loading'}>
                            {t('RecoverPassword.submit')}
                        </Button>
                    </form>
                )}
            />
        </FormPageRow>
    )
}

export default RecoverPasswordStart
