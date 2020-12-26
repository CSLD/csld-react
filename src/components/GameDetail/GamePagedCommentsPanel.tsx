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
import { IconEdit, IconPlus } from '../common/Icons/Icons'

const moreCommentsGql = require('./graphql/moreComments.graphql')
const updateCommentGql = require('./graphql/updateComment.graphql')

interface Props {
    readonly gameId: string
}

export const PAGE_SIZE = 10

const useStyles = createUseStyles({
    commentButtonWrapper: {
        textAlign: 'right',
        marginBottom: 8,
        marginRight: 18,
    },
})

export const GamePagedCommentsPanel = ({ gameId }: Props) => {
    const [offset, setOffset] = useState(0)
    const [editModalShown, setEditModalShown] = useState(false)
    const lastPageRef = useRef<CommentsPaged | undefined>(undefined)
    const classes = useStyles()
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

    const handleSaveComment = async (newText: string) => {
        await client.mutate<UpdateCommentMutation, UpdateCommentMutationVariables>({
            mutation: updateCommentGql,
            variables: {
                gameId,
                comment: newText,
            },
        })
        await query.refetch()
        setEditModalShown(false)
    }

    const currentUsersComment = query.data?.gameById?.currentUsersComment?.comment

    return (
        <>
            {loggedInUser?.id && page && (
                <div className={classes.commentButtonWrapper}>
                    {!currentUsersComment && (
                        <Button size="sm" variant="dark" onClick={() => setEditModalShown(true)}>
                            <IconPlus />
                            &nbsp;&nbsp;{t('GameDetail.addComment')}
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
