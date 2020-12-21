import React from 'react'
import { createUseStyles } from 'react-jss'
import { useApolloClient } from '@apollo/client'
import {
    CommentsPaged,
    SetCommentVisibleMutation,
    SetCommentVisibleMutationVariables,
} from '../../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../../theme/darkTheme'
import GameCommentPanel from '../GameCommentPanel/GameCommentPanel'
import { useLoggedInUser } from '../../../hooks/useLoggedInUser'
import { isAtLeastEditor } from '../../../utils/roleUtils'

const setCommentVisibleGql = require('./graphql/setCommentVisible.graphql')

interface Props {
    readonly page?: CommentsPaged
    readonly pageSize: number
    readonly offset: number
    readonly onOffsetChanged: (newOffset: number) => void
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

const PagedCommentsPanel = ({ offset, page, pageSize, onOffsetChanged }: Props) => {
    const classes = useStyles()
    const client = useApolloClient()
    const loggedInUser = useLoggedInUser()

    const lastPageOffset = page ? page.totalAmount - (page.totalAmount % 10) : 0
    const prevPageOffset = Math.max(offset - pageSize, 0)
    const nextPageOffset = Math.min(offset + pageSize, lastPageOffset)
    const pageOffsets = []
    for (let pageOffset = 0; pageOffset <= lastPageOffset; pageOffset += pageSize) {
        pageOffsets.push(pageOffset)
    }

    const handleChangeCommentVisibility = (commentId: string, isHidden: boolean) => {
        client.mutate<SetCommentVisibleMutation, SetCommentVisibleMutationVariables>({
            mutation: setCommentVisibleGql,
            variables: { commentId, visible: !isHidden },
        })
    }

    const showVisibilityButton = isAtLeastEditor(loggedInUser?.role)

    return (
        <>
            {page &&
                (page as CommentsPaged).comments.map(comment => (
                    <GameCommentPanel
                        key={comment.id}
                        comment={comment}
                        showVisibilityButton={showVisibilityButton}
                        onChangeCommentVisibility={handleChangeCommentVisibility}
                    />
                ))}
            <div className={classes.buttons}>
                <button type="button" className={classes.button} onClick={() => onOffsetChanged(0)}>
                    &lt;&lt;
                </button>
                <button type="button" className={classes.button} onClick={() => onOffsetChanged(prevPageOffset)}>
                    &lt;
                </button>
                {pageOffsets.map((pageOffset, n) => (
                    <button
                        key={pageOffset}
                        type="button"
                        className={classes.button}
                        onClick={() => onOffsetChanged(pageOffset)}
                    >
                        {n + 1}
                    </button>
                ))}
                <button type="button" className={classes.button} onClick={() => onOffsetChanged(nextPageOffset)}>
                    &gt;
                </button>
                <button type="button" className={classes.button} onClick={() => onOffsetChanged(lastPageOffset)}>
                    &gt;&gt;
                </button>
            </div>
        </>
    )
}

export default PagedCommentsPanel
