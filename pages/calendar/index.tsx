import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getLabelIds } from 'src/utils/roleUtils'
import { PageHeader } from 'src/components/common/PageHeader/PageHeader'
import { PageFooter } from 'src/components/common/PageFooter/PageFooter'
import EventCalendarListPanel from 'src/components/EventCalendar/EventCalendarListPanel'

interface Props {}
interface InitialProps {}

const CalendarPage: NextPage<Props, InitialProps> = () => {
    const router = useRouter()

    return (
        <>
            <PageHeader />
            <EventCalendarListPanel
                initialRequiredLabelIds={getLabelIds(router.query.initialRequiredLabelIds)}
                initialOptionalLabelIds={getLabelIds(router.query.initialOptionalLabelIds)}
            />
            <PageFooter />
        </>
    )
}

CalendarPage.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default CalendarPage
