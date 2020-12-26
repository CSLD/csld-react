import React from 'react'
import { createUseStyles } from 'react-jss'
import { GameBaseData, GameBaseDataPanel } from '../GameBaseDataPanel/GameBaseDataPanel'

interface Props {
    readonly games: GameBaseData[]
}

const useStyles = createUseStyles({
    games: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -20,
        marginBottom: 30,
    },
    game: {
        width: 425,
        margin: '10px 20px 10px 0',
    },
})

/**
 * List of games in detail (authored games for person / group, list of related games for event)
 */
const DetailGameList = ({ games }: Props) => {
    const classes = useStyles()

    return (
        <div className={classes.games}>
            {games.map(game => (
                <GameBaseDataPanel key={game.id} game={game} className={classes.game} variant="light" />
            ))}
        </div>
    )
}

export default DetailGameList
