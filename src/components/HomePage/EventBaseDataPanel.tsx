import React from 'react'
import { Event } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { darkTheme } from '../../theme/darkTheme'
import { IconUser, IconLocation } from '../common/Icons/Icons'
import { formatTimeRange } from '../../utils/dateUtils'

export type EventBaseData = Pick<Event, 'id' | 'name' | 'from' | 'to' | 'amountOfPlayers' | 'loc'>

interface Props {
    readonly event?: EventBaseData
    readonly className?: string
}

const useStyles = createUseStyles({
    wrapper: {
        height: 70,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.6rem',
        justifyContent: 'center',
        background: darkTheme.backgroundLight,
        borderRadius: 4,
        color: darkTheme.textDark,
        lineHeight: '170%',
        boxSizing: 'border-box',
        padding: '8px 15px',

        '&:hover': {
            backgroundColor: darkTheme.backgroundHover,
            color: darkTheme.textDark,
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

    const { fromFormatted, toFormatted, justOneDate } = formatTimeRange(event?.from, event?.to)

    return (
        <a className={classNames(classes.wrapper, className)} href="/">
            {event && (
                <>
                    <div className={classes.name}>{event?.name}</div>
                    <div>
                        {justOneDate ? (
                            fromFormatted
                        ) : (
                            <>
                                {fromFormatted}
                                &nbsp;-&nbsp;
                                {toFormatted}
                            </>
                        )}
                    </div>
                    <div>
                        <IconUser />
                        <span className={classes.textByIcon}>{event.amountOfPlayers}</span>
                        <IconLocation />
                        <span className={classes.textByIcon}>{event.loc || '-'}</span>
                    </div>
                </>
            )}
        </a>
    )
}
