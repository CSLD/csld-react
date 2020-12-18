import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import UserSettingsPanel from '../../src/components/Settings/UserSettingsPanel'

interface Props {}
interface InitialProps {}

const SignInPage: NextPage<Props, InitialProps> = () => {
    return (
        <>
            <PageHeader />
            <UserSettingsPanel />
            <PageFooter />
        </>
    )
}

SignInPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default SignInPage
