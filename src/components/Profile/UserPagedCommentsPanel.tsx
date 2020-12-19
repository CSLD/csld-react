import React, { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    CommentsPaged,
    MoreUserCommentsQuery,
    MoreUserCommentsQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import PagedCommentsPanel from '../common/PagedCommentsPanel/PagedCommentsPanel'

const moreUserCommentsQuery = require('./graphql/moreUserComments.graphql')

interface Props {
    readonly userId: string
    readonly firstPage: CommentsPaged
}

export const PAGE_SIZE = 10

const UserPagedCommentsPanel = ({ userId, firstPage }: Props) => {
    const [offset, setOffset] = useState(0)
    const lastPageRef = useRef<CommentsPaged | undefined>(firstPage)
    const query = useQuery<MoreUserCommentsQuery, MoreUserCommentsQueryVariables>(moreUserCommentsQuery, {
        variables: {
            userId,
            offset,
            limit: PAGE_SIZE,
        },
        skip: !!firstPage && offset === 0,
        ssr: false,
    })

    lastPageRef.current = (query.data && (query.data.userById?.commentsPaged as CommentsPaged)) || lastPageRef.current
    const page = lastPageRef.current

    return <PagedCommentsPanel page={page} pageSize={PAGE_SIZE} offset={offset} onOffsetChanged={setOffset} />
}

export default UserPagedCommentsPanel
