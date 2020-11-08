import React from 'react'
import { createUseStyles } from 'react-jss'
import { GameBaseData, GameBaseDataPanel } from '../common/GameBaseDataPanel/GameBaseDataPanel'
import { darkTheme } from '../../theme/darkTheme'
import { EventBaseData, EventBaseDataPanel } from './EventBaseDataPanel'
import classNames from 'classnames'

const useStyles = createUseStyles({
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 650,
        backgroundColor: darkTheme.background,
    },
    element: {
        margin: 10,
        width: 275,
    },
})

interface Props {
    readonly elements: (GameBaseData | EventBaseData)[]
    readonly className?: string
}

const isGame = (element: GameBaseData | EventBaseData): element is GameBaseData =>
    (element as any).players !== undefined

const isEvent = (element: GameBaseData | EventBaseData): element is GameBaseData =>
    (element as any).amountOfPlayers !== undefined

/**
 * Grid for games or events
 */
export const GameEventGrid = ({ elements, className }: Props) => {
    const classes = useStyles()

    return (
        <div className={classNames(classes.grid, className)}>
            {elements.map(element => {
                if (isGame(element)) {
                    return <GameBaseDataPanel game={element} className={classes.element} />
                }
                if (isEvent(element)) {
                    return <EventBaseDataPanel event={element} className={classes.element} />
                }
                return ''
            })}
        </div>
    )
}
