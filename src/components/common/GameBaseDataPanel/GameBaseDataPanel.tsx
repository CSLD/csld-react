import React from 'react'
import { Game } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { darkTheme } from '../../../theme/darkTheme'
import { GameRatingBox } from '../GameRatingBox/GameRatingBox'
import { IconRating, IconComment, IconUser } from '../Icons/Icons'

export type GameBaseData = Pick<
    Game,
    'id' | 'name' | 'players' | 'amountOfComments' | 'amountOfRatings' | 'totalRating'
>

interface Props {
    readonly game: GameBaseData
    readonly className?: string
}

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        background: darkTheme.backgroundLight,
        borderRadius: 4,
        color: darkTheme.text,
        padding: 15,
        boxSizing: 'border-box',

        '&:hover': {
            backgroundColor: darkTheme.backgroundHover,
        },
    },
    rightWrapper: {
        minWidth: 0,
    },
    rating: {
        width: 40,
        height: 40,
        flexShrink: 0,
        marginRight: 8,
    },
    name: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.82rem',
        fontWeight: 700,
        marginTop: 4,
        marginBottom: 5,
    },
    icons: {
        color: darkTheme.textDark,
        fontSize: '0.6rem',
    },
    statValue: {
        margin: '0 8px 0 3px',
    },
})

export const GameBaseDataPanel = ({
    className,
    game: { name, players, amountOfComments, amountOfRatings, totalRating },
}: Props) => {
    const classes = useStyles()
    return (
        <a className={classnames(classes.wrapper, className)} href="/">
            <GameRatingBox amountOfRatings={amountOfRatings} rating={totalRating} className={classes.rating} />
            <div className={classes.rightWrapper}>
                <div className={classes.name}>{name}</div>
                <div className={classes.icons}>
                    <IconUser />
                    <span className={classes.statValue}>{players}</span>
                    <IconComment />
                    <span className={classes.statValue}>{amountOfComments}</span>
                    <IconRating />
                    <span className={classes.statValue}>{amountOfRatings} x</span>
                </div>
            </div>
        </a>
    )
}
