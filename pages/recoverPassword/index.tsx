import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import RecoverPasswordStart from '../../src/components/RecoverPassword/RecoverPasswordStart'
import RecoverPasswordFinish from '../../src/components/RecoverPassword/RecoverPasswordFinish'

interface Props {}
interface InitialProps {}

const SignInPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()
    const token = router.query.token as string

    return (
        <>
            <PageHeader />
            {!token && <RecoverPasswordStart />}
            {token && <RecoverPasswordFinish token={token} />}
            <PageFooter />
        </>
    )
}

SignInPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default SignInPage
