import React from 'react'
import { NextPage } from 'next'
import { PageHeader } from 'src/components/common/PageHeader/PageHeader'
import { PageFooter } from 'src/components/common/PageFooter/PageFooter'
import AdminMenuPanel from '../../src/components/Admin/AdminMenuPanel'

interface Props {}
interface InitialProps {}

const AdminMenuPage: NextPage<Props, InitialProps> = () => {
    return (
        <>
            <PageHeader />
            <AdminMenuPanel />
            <PageFooter />
        </>
    )
}

AdminMenuPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default AdminMenuPage
