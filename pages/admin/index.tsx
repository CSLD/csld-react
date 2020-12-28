import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from 'src/components/common/PageHeader/PageHeader'
import { PageFooter } from 'src/components/common/PageFooter/PageFooter'
import AdminMenuPanel from '../../src/components/Admin/AdminMenuPanel'
import SignInRequiredWrapper from '../../src/components/common/SignInRequiredWrapper/SignInRequiredWrapper'

interface Props {}
interface InitialProps {}

const AdminMenuPage: NextPage<Props, InitialProps> = () => {
    return (
        <>
            <PageHeader />
            <SignInRequiredWrapper requiredRole="EDITOR">
                <AdminMenuPanel />
            </SignInRequiredWrapper>
            <PageFooter />
        </>
    )
}

AdminMenuPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default AdminMenuPage
