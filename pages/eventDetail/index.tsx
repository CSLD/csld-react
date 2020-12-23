import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import EventDetailPanel from '../../src/components/EventDetail/EventDetailPanel'

interface Props {}
interface InitialProps {}

const EventDetailPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <EventDetailPanel eventId={router.query.id as string} />
            <PageFooter />
        </>
    )
}

EventDetailPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default EventDetailPage
