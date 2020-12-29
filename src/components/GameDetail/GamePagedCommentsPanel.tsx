import React, { useEffect, useRef, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import {
    CommentsPaged,
    MoreCommentsQuery,
    MoreCommentsQueryVariables,
    UpdateCommentMutation,
    UpdateCommentMutationVariables,
} from '../../graphql/__generated__/typescript-operations'
import PagedCommentsPanel from '../common/PagedCommentsPanel/PagedCommentsPanel'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { IconDisabled, IconEdit, IconLoading, IconPlus } from '../common/Icons/Icons'
import { useShowToast } from '../../hooks/useShowToast'

const EditCommentModal = React.lazy(() => import('./EditCommentModal'))

const moreCommentsGql = require('./graphql/moreComments.graphql')
const updateCommentGql = require('./graphql/updateComment.graphql')

interface Props {
    readonly gameId: string
    readonly commentsDisabled: boolean
}

export const PAGE_SIZE = 10

const useStyles = createUseStyles({
    commentButtonWrapper: {
        textAlign: 'right',
        marginBottom: 8,
        marginRight: 18,
    },
})

export const GamePagedCommentsPanel = ({ gameId, commentsDisabled }: Props) => {
    const [offset, setOffset] = useState(0)
    const [editModalShown, setEditModalShown] = useState(false)
    const [editModalLoaded, setEditModalLoaded] = useState(false)
    const lastPageRef = useRef<CommentsPaged | undefined>(undefined)
    const classes = useStyles()
    const showToast = useShowToast()
    const { t } = useTranslation('common')
    const loggedInUser = useLoggedInUser()
    const client = useApolloClient()
    // Clear cached page when gameId changes
    useEffect(() => {
        lastPageRef.current = undefined
    }, [gameId])

    const query = useQuery<MoreCommentsQuery, MoreCommentsQueryVariables>(moreCommentsGql, {
        variables: {
            gameId,
            commentsOffset: offset,
            commentsLimit: PAGE_SIZE,
        },
        ssr: false,
    })

    lastPageRef.current = (query.data && (query.data.gameById?.commentsPaged as CommentsPaged)) || lastPageRef.current
    const page = lastPageRef.current

    const currentUsersComment = query.data?.gameById?.currentUsersComment?.comment

    const handleSaveComment = async (newText: string) => {
        const res = await client.mutate<UpdateCommentMutation, UpdateCommentMutationVariables>({
            mutation: updateCommentGql,
            variables: {
                gameId,
                comment: newText,
            },
        })
        if (res.data) {
            showToast(t(currentUsersComment ? 'GameDetail.commentUpdated' : 'GameDetail.commentAdded'), 'success')
            query.refetch()
            setEditModalShown(false)
        }
    }

    const editModalLoading = editModalShown && !editModalLoaded

    return (
        <>
            {loggedInUser?.id && page && (
                <div className={classes.commentButtonWrapper}>
                    {!currentUsersComment && !commentsDisabled && (
                        <Button
                            size="sm"
                            variant="dark"
                            onClick={() => setEditModalShown(true)}
                            disabled={editModalLoading}
                        >
                            {editModalLoading ? <IconLoading /> : <IconPlus />}
                            &nbsp;&nbsp;{t('GameDetail.addComment')}
                        </Button>
                    )}
                    {!currentUsersComment && commentsDisabled && (
                        <Button size="sm" variant="dark" disabled>
                            <IconDisabled />
                            &nbsp;&nbsp;{t('GameDetail.commentsDisabled')}
                        </Button>
                    )}
                    {currentUsersComment && (
                        <Button
                            size="sm"
                            variant="dark"
                            onClick={() => setEditModalShown(true)}
                            disabled={editModalLoading}
                        >
                            {editModalLoading ? <IconLoading /> : <IconEdit />}
                            &nbsp;&nbsp;{t('GameDetail.updateComment')}
                        </Button>
                    )}
                </div>
            )}
            {editModalShown && (
                <React.Suspense fallback={<span />}>
                    <EditCommentModal
                        oldText={currentUsersComment || ''}
                        onHide={() => setEditModalShown(false)}
                        onLoad={() => setEditModalLoaded(true)}
                        onSubmit={handleSaveComment}
                    />
                </React.Suspense>
            )}
            <PagedCommentsPanel page={page} pageSize={PAGE_SIZE} offset={offset} onOffsetChanged={setOffset} />
        </>
    )
}
