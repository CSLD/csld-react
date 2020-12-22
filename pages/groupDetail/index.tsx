import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import GroupDetailPanel from '../../src/components/GroupDetail/GroupDetailPanel'

interface Props {}
interface InitialProps {}

const GroupDetailPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <GroupDetailPanel groupId={router.query.id as string} />
            <PageFooter />
        </>
    )
}

GroupDetailPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default GroupDetailPage
