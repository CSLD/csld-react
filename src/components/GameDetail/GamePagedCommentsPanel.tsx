import React, { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    CommentsPaged,
    MoreCommentsQuery,
    MoreCommentsQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import PagedCommentsPanel from '../common/PagedCommentsPanel/PagedCommentsPanel'

const moreCommentsQuery = require('./graphql/moreComments.graphql')

interface Props {
    readonly gameId: string
    readonly firstPage?: CommentsPaged
}

export const PAGE_SIZE = 10

export const GamePagedCommentsPanel = ({ gameId, firstPage }: Props) => {
    const [offset, setOffset] = useState(0)
    const lastPageRef = useRef<CommentsPaged | undefined>(firstPage)
    const query = useQuery<MoreCommentsQuery, MoreCommentsQueryVariables>(moreCommentsQuery, {
        variables: {
            gameId,
            commentsOffset: offset,
            commentsLimit: PAGE_SIZE,
        },
        skip: !!firstPage && offset === 0,
        ssr: false,
    })

    lastPageRef.current = (query.data && (query.data.gameById?.commentsPaged as CommentsPaged)) || lastPageRef.current
    const page = lastPageRef.current

    return <PagedCommentsPanel page={page} pageSize={PAGE_SIZE} offset={offset} onOffsetChanged={setOffset} />
}
