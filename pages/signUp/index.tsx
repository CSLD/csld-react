import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import SignUpPanel from '../../src/components/SignUp/SignUpPanel'

interface Props {}
interface InitialProps {}

const SignUpPage: NextPage<Props, InitialProps> = () => {
    return (
        <>
            <PageHeader />
            <SignUpPanel />
            <PageFooter />
        </>
    )
}

SignUpPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default SignUpPage
