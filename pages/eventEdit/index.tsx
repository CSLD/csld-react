import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageHeader } from '../../src/components/common/PageHeader/PageHeader'
import { PageFooter } from '../../src/components/common/PageFooter/PageFooter'
import EventEditPanel from '../../src/components/EventEdit/EventEditPanel'

interface Props {}
interface InitialProps {}

const EventEditPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <EventEditPanel eventId={router.query.id as string} />
            <PageFooter />
        </>
    )
}

EventEditPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default EventEditPage
