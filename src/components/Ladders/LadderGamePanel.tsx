import React from 'react'
import { createUseStyles } from 'react-jss'
import { darkTheme } from 'src/theme/darkTheme'
import { LadderGameDataFragment } from 'src/graphql/__generated__/typescript-operations'
import { GameRatingBox } from '../common/GameRatingBox/GameRatingBox'
import { GameLink } from '../common/GameLink/GameLink'
import { IconNumComments, IconNumRatings } from '../common/Icons/Icons'

interface Props {
    readonly game: LadderGameDataFragment
}

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 0',
        margin: '4px 0',
        backgroundColor: darkTheme.backgroundRealWhite,
        fontSize: '0.75rem',
        borderRadius: 5,
    },
    fact: {
        flexBasis: 80,
        margin: '0 8px',
        flex: 0,
    },
    text: {
        margin: '0 8px',
        flex: 1,
    },
    ratingBox: {
        flexBasis: 145,
        margin: '0 8px',
        flex: 0,
    },
    link: {
        fontSize: '1rem',
        color: darkTheme.textGreen,

        '&:hover': {
            color: darkTheme.text,
        },
    },
    icon: {
        color: darkTheme.textGreen,
        marginLeft: 4,
    },
})

const LadderGamePanel = ({ game }: Props) => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <GameRatingBox
                amountOfRatings={game.amountOfRatings}
                rating={game.totalRating}
                averageRating={game.averageRating}
                size="medium"
                className={classes.ratingBox}
            />
            <div className={classes.text}>
                <GameLink game={game} className={classes.link}>
                    {game.name}
                </GameLink>
                <br />
                {game.labels.map(label => label.name).join(', ')}
            </div>
            <div className={classes.fact}>{game.year}</div>
            <div className={classes.fact}>
                {game.amountOfRatings}x
                <IconNumRatings className={classes.icon} />
            </div>
            <div className={classes.fact}>
                {game.amountOfComments}x
                <IconNumComments className={classes.icon} />
            </div>
        </div>
    )
}

export default LadderGamePanel
