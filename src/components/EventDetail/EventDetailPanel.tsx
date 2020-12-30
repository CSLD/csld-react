import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useMutation, useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { Col, Row } from 'react-bootstrap'
import classNames from 'classnames'
import isInBrowser from 'is-in-browser'
import { darkTheme } from '../../theme/darkTheme'
import {
    DeleteEventMutation,
    DeleteEventMutationVariables,
    LoadEventQuery,
    LoadEventQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import DetailGameList from '../common/DetailGameList/DetailGameList'
import { formatTimeRange } from '../../utils/dateUtils'
import DetailLabelList from '../common/DetailLabelList/DetailLabelList'
import ActionButton from '../common/ActionButton/ActionButton'
import { useRoutes } from '../../hooks/useRoutes'
import ConfirmationModal from '../common/ConfirmationModal/ConfirmationModal'
import { canDelete, canEdit } from '../../utils/graphqlUtils'
import { useShowToast } from '../../hooks/useShowToast'

const loadEventGql = require('./graphql/loadEvent.graphql')
const deleteEventGql = require('./graphql/deleteEvent.graphql')

interface Props {
    readonly eventId: string
}

const useStyles = createUseStyles({
    headerWrapper: {
        backgroundColor: darkTheme.background,
        padding: '20px 0',
        minHeight: 200,
    },
    header: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: darkTheme.textGreen,
        lineHeight: '100%',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '0.75rem',
        color: darkTheme.textLighter,
        marginBottom: '0.6rem',
    },
    description: {
        maxWidth: 675,
        lineHeight: '135%',
    },
    labelsWrapper: {
        margin: '20px 0 15px',
    },
    gamesWrapper: {
        backgroundColor: darkTheme.backgroundNearWhite,
        minHeight: 200,
        paddingTop: 20,
        paddingBottom: 20,
    },
    link: {
        color: darkTheme.textGreen,

        '&:hover': {
            color: darkTheme.text,
        },
    },
})

const EventDetailPanel = ({ eventId }: Props) => {
    const classes = useStyles()
    const routes = useRoutes()
    const [deleteConfirmShown, setDeleteConfirmShown] = useState(false)
    const { t } = useTranslation('common')
    const { data } = useQuery<LoadEventQuery, LoadEventQueryVariables>(loadEventGql, {
        ssr: false,
        skip: !isInBrowser,
        fetchPolicy: 'network-only',
        variables: { eventId },
    })
    const [deleteEvent, { loading: deleteLoading }] = useMutation<DeleteEventMutation, DeleteEventMutationVariables>(
        deleteEventGql,
    )
    const showToast = useShowToast()
    const event = data?.eventById
    const games = event?.games || []
    const labels = event?.labels || []
    const { fromFormatted, toFormatted, justOneDate } = formatTimeRange(event?.from, event?.to)
    const editVisible = canEdit(event?.allowedActions)
    const deleteVisible = canDelete(event?.allowedActions)

    const handleEditEvent = () => {
        routes.push(routes.eventEdit(eventId))
    }
    const handleDeleteEvent = () => {
        setDeleteConfirmShown(true)
    }

    const handleHideDeleteModal = () => setDeleteConfirmShown(false)

    const handleDoDeleteEvent = () => {
        deleteEvent({ variables: { eventId } }).then(res => {
            if (res.data) {
                setDeleteConfirmShown(false)
                showToast(t('EventDetail.eventDeleted'), 'success')
                routes.push(routes.homepage())
            }
        })
    }

    return (
        <>
            <div className={classes.headerWrapper}>
                <WidthFixer>
                    {event && (
                        <>
                            <div className={classes.header}>{event.name}</div>
                            <div className={classes.text}>
                                {t('EventDetail.players', { count: event.amountOfPlayers })}
                            </div>
                            {event.web && (
                                <div className={classes.text}>
                                    <strong>{t('Event.web')}: </strong>
                                    <a href={event.web} className={classes.link} target="_blank" rel="noreferrer">
                                        {event.web}
                                    </a>
                                </div>
                            )}
                            {event.loc && (
                                <div className={classes.text}>
                                    <strong>{t('Event.loc')}: </strong>
                                    {event.loc}
                                </div>
                            )}
                            <div className={classes.text}>
                                <strong>{t('EventDetail.date')}: </strong>
                                {justOneDate && fromFormatted}
                                {!justOneDate && (
                                    <>
                                        {fromFormatted}
                                        &nbsp;-&nbsp;
                                        {toFormatted}
                                    </>
                                )}
                            </div>
                            {event.description && (
                                <div
                                    className={classNames(classes.text, classes.description)}
                                    /* eslint-disable-next-line react/no-danger */
                                    dangerouslySetInnerHTML={{ __html: event.description }}
                                />
                            )}
                            <div className={classes.labelsWrapper}>
                                <DetailLabelList labels={labels} linkType="events" />
                            </div>
                        </>
                    )}
                </WidthFixer>
            </div>
            <div className={classes.gamesWrapper}>
                <WidthFixer>
                    {event && (
                        <Row>
                            <Col md={9}>
                                <WidthFixer>
                                    <DetailGameList games={games} />
                                </WidthFixer>
                            </Col>
                            <Col md={3}>
                                {editVisible && (
                                    <ActionButton onClick={handleEditEvent}>{t('EventDetail.edit')}</ActionButton>
                                )}
                                {deleteVisible && (
                                    <ActionButton onClick={handleDeleteEvent}>{t('EventDetail.delete')}</ActionButton>
                                )}
                            </Col>
                        </Row>
                    )}
                </WidthFixer>
            </div>
            <ConfirmationModal
                show={deleteConfirmShown}
                content={t('EventDetail.deleteEventConfirmation')}
                loading={deleteLoading}
                onHide={handleHideDeleteModal}
                onCancel={handleHideDeleteModal}
                onConfirm={handleDoDeleteEvent}
            />
        </>
    )
}

export default EventDetailPanel
