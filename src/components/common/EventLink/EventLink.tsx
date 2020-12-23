import React from 'react'
import Link from 'next/link'
import { Event } from 'src/graphql/__generated__/typescript-operations'
import { getEventRoute } from '../../../utils/routeUtils'

interface Props {
    readonly event: Pick<Event, 'id' | 'name'>
    readonly className?: string
}

/**
 * Create Next.JS link to event
 *
 * @param eventIdId Event to link to
 * @param className Optional classname to add to the 'A' tag
 * @param children Link contents
 */

const EventLink: React.FC<Props> = ({ event, className, children }) => (
    <Link href={{ pathname: '/event', query: { id: event.id } }} as={getEventRoute(event)}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={className}>{children}</a>
    </Link>
)

export default EventLink
