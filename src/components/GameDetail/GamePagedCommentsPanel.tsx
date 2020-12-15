import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/client'
import {
    CommentsPaged,
    MoreCommentsQuery,
    MoreCommentsQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'
import { GameCommentPanel } from './GameCommentPanel'

const moreCommentsQuery = require('./graphql/moreComments.graphql')

interface Props {
    readonly gameId: string
    readonly firstPage?: CommentsPaged
}

const useStyles = createUseStyles({
    buttons: {
        textAlign: 'right',
        marginTop: 5,
    },
    button: {
        border: `1px solid ${darkTheme.text}`,
        margin: 5,
        outline: 0,
        padding: '4px 8px',
        borderRadius: 2,
        fontWeight: 1000,
        fontSize: '0.65rem',
        color: darkTheme.textGreen,
        backgroundColor: darkTheme.backgroundWhite,

        '&:hover': {
            color: darkTheme.textOnLightDark,
        },
    },
})

export const PAGE_SIZE = 10

export const GamePagedCommentsPanel = ({ gameId, firstPage }: Props) => {
    const [offset, setOffset] = useState(0)
    const lastPageRef = useRef<CommentsPaged | undefined>(firstPage)
    const classes = useStyles()
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

    const lastPageOffset = page ? page.totalAmount - (page.totalAmount % 10) : 0
    const prevPageOffset = Math.max(offset - PAGE_SIZE, 0)
    const nextPageOffset = Math.min(offset + PAGE_SIZE, lastPageOffset)
    const pageOffsets = []
    for (let pageOffset = 0; pageOffset <= lastPageOffset; pageOffset += PAGE_SIZE) {
        pageOffsets.push(pageOffset)
    }

    return (
        <>
            {page &&
                (page as CommentsPaged).comments.map(comment => (
                    <GameCommentPanel key={comment.id} comment={comment} />
                ))}
            <div className={classes.buttons}>
                <button type="button" className={classes.button} onClick={() => setOffset(0)}>
                    &lt;&lt;
                </button>
                <button type="button" className={classes.button} onClick={() => setOffset(prevPageOffset)}>
                    &lt;
                </button>
                {pageOffsets.map((pageOffset, n) => (
                    <button
                        key={pageOffset}
                        type="button"
                        className={classes.button}
                        onClick={() => setOffset(pageOffset)}
                    >
                        {n + 1}
                    </button>
                ))}
                <button type="button" className={classes.button} onClick={() => setOffset(nextPageOffset)}>
                    &gt;
                </button>
                <button type="button" className={classes.button} onClick={() => setOffset(lastPageOffset)}>
                    &gt;&gt;
                </button>
            </div>
        </>
    )
}
