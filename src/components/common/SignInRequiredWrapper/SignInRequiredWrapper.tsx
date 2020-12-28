import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLoggedInUser } from '../../../hooks/useLoggedInUser'
import SignInPanel from '../../SignIn/SignInPanel'
import { UserRole } from '../../../graphql/__generated__/typescript-operations'
import FormPageRow from '../FormPageRow/FormPageRow'
import { useRoutes } from '../../../hooks/useRoutes'
import { TextLink } from '../TextLink/TextLink'
import { IconBack } from '../Icons/Icons'

type RequiredRole = 'USER' | 'EDITOR' | 'ADMIN'

interface Props {
    readonly requiredRole?: RequiredRole
}

const AccessDeniedPanel = () => {
    const { t } = useTranslation('common')
    const routes = useRoutes()
    const hp = routes.homepage()

    return (
        <FormPageRow>
            <p>{t('SignInRequired.accessDenied')}</p>
            <TextLink href={hp.href} as={hp.as}>
                <IconBack />
                &nbsp;
                {t('SignInRequired.backToHomepage')}
            </TextLink>
        </FormPageRow>
    )
}

const SignInRequiredWrapper: React.FC<Props> = ({ requiredRole = 'USER', children }) => {
    const loggedIn = useLoggedInUser()
    const { t } = useTranslation('common')

    if (!loggedIn) {
        return <SignInPanel infoMessage={t('SignInRequired.signInRequired')} stayOnPage />
    }

    const role = loggedIn?.role
    if (!role) {
        // Loading
        return <span />
    }

    if (requiredRole === 'EDITOR' && role !== UserRole.Editor && role !== UserRole.Admin) {
        return <AccessDeniedPanel />
    }

    if (requiredRole === 'ADMIN' && role !== UserRole.Admin) {
        return <AccessDeniedPanel />
    }

    return <>{children}</>
}

export default SignInRequiredWrapper
