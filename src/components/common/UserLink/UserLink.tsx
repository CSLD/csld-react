import React from 'react'
import Link from 'next/link'

interface Props {
    readonly userId: string
    readonly className?: string
}

/**
 * Create Next.JS link to user
 *
 * @param userId User to ling to
 * @param className Optional classname to add to the 'A' tag
 * @param children Link contents
 */

const UserLink: React.FC<Props> = ({ userId, className, children }) => (
    <Link href={{ pathname: '/profile', query: { id: userId } }} as={`/profile/${userId}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={className}>{children}</a>
    </Link>
)

export default UserLink
