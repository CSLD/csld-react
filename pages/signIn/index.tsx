import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import SignInPanel from '../../src/components/SignIn/SignInPanel'

interface Props {}
interface InitialProps {}

const SignInPage: NextPage<Props, InitialProps> = () => {
    return (
        <>
            <PageHeader />
            <SignInPanel />
            <PageFooter />
        </>
    )
}

SignInPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default SignInPage
