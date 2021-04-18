import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import CalendarEventPanel from './CalendarEventPanel'
import { CalendarEventDataFragment } from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'

interface EventsInMonthProps {
    readonly eventsInMonth: CalendarEventDataFragment[]
    readonly monthNumber: Number
}

interface LineWithMonthProps {
    readonly monthNumber: Number
}

const useStyles = createUseStyles({
    separator: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: darkTheme.textLighter,
        fontSize: '.7rem',
        margin: '6px 0',
        '&:before': {
            content: "''",
            flex: '1',
            borderBottom: `1px solid ${darkTheme.textLighter}`,
        },
        '&:after': {
            content: "''",
            flex: '1',
            borderBottom: `1px solid ${darkTheme.textLighter}`,
        },
        '&:not(:empty)::before': {
            marginRight: '1em',
        },
        '&:not(:empty)::after': {
            marginLeft: '1em',
        },
    },
})

const LineWithMonth = ({ monthNumber }: LineWithMonthProps) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    return <div className={classes.separator}>{t(`Month.${monthNumber}`)}</div>
}

export const EventsInMonth = ({ eventsInMonth, monthNumber }: EventsInMonthProps) => {
    if (eventsInMonth.length > 0) {
        return (
            <>
                <LineWithMonth monthNumber={monthNumber} />
                {eventsInMonth.map((event: CalendarEventDataFragment) => (
                    <CalendarEventPanel key={event.id} event={event} />
                ))}
            </>
        )
    }
    return null
}
