import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { CalendarEventDataFragment } from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'
import EventLink from '../common/EventLink/EventLink'
import { formatTimeRange } from '../../utils/dateUtils'

interface Props {
    readonly event: CalendarEventDataFragment
}

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 0',
        margin: '0 0 8px',
        backgroundColor: darkTheme.backgroundRealWhite,
        fontSize: '0.75rem',
        borderRadius: 5,
    },
    fact: {
        flexBasis: 150,
        margin: '0 8px',
        flex: 0,
    },
    text: {
        margin: '0 8px',
        flex: 1,
    },
    name: {
        fontSize: '1rem',
    },
    link: {
        color: darkTheme.textGreen,

        '&:hover': {
            color: darkTheme.text,
        },
    },
})

const CalendarEventPanel = ({ event }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const { fromFormatted, toFormatted, justOneDate } = formatTimeRange(event?.from, event?.to)

    return (
        <div className={classes.wrapper}>
            <div className={classes.text}>
                <EventLink event={event} className={classNames(classes.link, classes.name)}>
                    {event.name}
                </EventLink>
                <br />
                {event.labels?.map(label => label.name).join(', ')}
            </div>
            <div className={classes.fact}>
                {!justOneDate && `${t('EventCalendar.eventFrom')}: `}
                {fromFormatted}
                {!justOneDate && (
                    <>
                        <br />
                        {t('EventCalendar.eventTo')}: {toFormatted}
                    </>
                )}
            </div>
            <div className={classes.fact}>
                {event.web && (
                    <a href={event.web} target="_blank" rel="noreferrer" className={classes.link}>
                        {t('EventCalendar.link')}
                    </a>
                )}
            </div>
        </div>
    )
}

export default CalendarEventPanel
