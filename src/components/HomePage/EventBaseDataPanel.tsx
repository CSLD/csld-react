import React from 'react'
import { Event } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { darkTheme } from '../../theme/darkTheme'
import { IconUser, IconLocation } from '../common/Icons/Icons'
import { hasTimePart, parseDateTime } from '../../utils/dateUtils'

import { format } from 'date-fns'

export type EventBaseData = Pick<Event, 'id' | 'name' | 'from' | 'to' | 'amountOfPlayers' | 'loc'>

interface Props {
    readonly event: EventBaseData
    readonly className?: string
}

const useStyles = createUseStyles({
    wrapper: {
        height: 75,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.6rem',
        justifyContent: 'center',
        background: darkTheme.backgroundLight,
        borderRadius: 4,
        color: darkTheme.textDark,
        lineHeight: '200%',
        boxSizing: 'border-box',
        padding: '8px 15px',

        '&:hover': {
            backgroundColor: darkTheme.backgroundHover,
        },
    },
    name: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.82rem',
        fontWeight: 700,
        color: darkTheme.textGreen,
        marginBottom: 3,
    },
    textByIcon: {
        margin: '0 8px 0 3px',
    },
})

export const EventBaseDataPanel = ({ event, className }: Props) => {
    const classes = useStyles()

    const fromDate = parseDateTime(event.from)
    const toDate = parseDateTime(event.to)
    const justDates = !hasTimePart(fromDate) && !hasTimePart(toDate)
    const fromFormatted = fromDate && format(fromDate, justDates ? 'd.M.yyy' : 'd.M.yyy HH:mm')
    const toFormatted = fromDate && format(fromDate, justDates ? 'd.M.yyy' : 'd.M.yyy HH:mm')

    return (
        <a className={classNames(classes.wrapper, className)} href="/">
            <div className={classes.name}>{event.name}</div>
            <div>
                {fromFormatted}
                &nbsp;-&nbsp;
                {toFormatted}
            </div>
            <div>
                <IconUser />
                <span className={classes.textByIcon}>{event.amountOfPlayers}</span>
                <IconLocation />
                <span className={classes.textByIcon}>{event.loc || '-'}</span>
            </div>
        </a>
    )
}
