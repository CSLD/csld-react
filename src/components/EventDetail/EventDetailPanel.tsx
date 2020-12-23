import React from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { Col, Row } from 'react-bootstrap'
import { darkTheme } from '../../theme/darkTheme'
import { LoadEventQuery, LoadEventQueryVariables } from '../../graphql/__generated__/typescript-operations'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import DetailGameList from '../common/DetailGameList/DetailGameList'
import { formatTimeRange } from '../../utils/dateUtils'
import DetailLabelList from '../common/DetailLabelList/DetailLabelList'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { isAtLeastEditor } from '../../utils/roleUtils'
import ActionButton from '../common/ActionButton/ActionButton'
import classNames from 'classnames'

const loadEventGql = require('./graphql/loadEvent.graphql')

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
    const { t } = useTranslation('common')
    const { data } = useQuery<LoadEventQuery, LoadEventQueryVariables>(loadEventGql, {
        ssr: false,
        fetchPolicy: 'network-only',
        variables: { eventId },
    })
    const loggedInUser = useLoggedInUser()

    const event = data?.eventById
    const games = event?.games || []
    const labels = event?.labels || []
    const { fromFormatted, toFormatted, justOneDate } = formatTimeRange(event?.from, event?.to)

    const handleEdit = () => {}
    const handleDelete = () => {}

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
                                    dangerouslySetInnerHTML={{ __html: event.description }}
                                />
                            )}
                            <div className={classes.labelsWrapper}>
                                <DetailLabelList labels={labels} />
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
                                {isAtLeastEditor(loggedInUser?.role) && (
                                    <>
                                        <ActionButton onClick={handleEdit}>{t('EventDetail.edit')}</ActionButton>
                                        <ActionButton onClick={handleDelete}>{t('EventDetail.delete')}</ActionButton>
                                    </>
                                )}
                            </Col>
                        </Row>
                    )}
                </WidthFixer>
            </div>
        </>
    )
}

export default EventDetailPanel
