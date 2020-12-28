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
import EditCommentModal from './EditCommentModal'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { IconDisabled, IconEdit, IconPlus } from '../common/Icons/Icons'
import { useShowToast } from '../../hooks/useShowToast'

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

    return (
        <>
            {loggedInUser?.id && page && (
                <div className={classes.commentButtonWrapper}>
                    {!currentUsersComment && !commentsDisabled && (
                        <Button size="sm" variant="dark" onClick={() => setEditModalShown(true)}>
                            <IconPlus />
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
                        <Button size="sm" variant="dark" onClick={() => setEditModalShown(true)}>
                            <IconEdit />
                            &nbsp;&nbsp;{t('GameDetail.updateComment')}
                        </Button>
                    )}
                </div>
            )}
            {editModalShown && (
                <EditCommentModal
                    oldText={currentUsersComment || ''}
                    onHide={() => setEditModalShown(false)}
                    onSubmit={handleSaveComment}
                />
            )}
            <PagedCommentsPanel page={page} pageSize={PAGE_SIZE} offset={offset} onOffsetChanged={setOffset} />
        </>
    )
}
