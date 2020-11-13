import React from 'react'
import { Game } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { darkTheme } from '../../../theme/darkTheme'
import { GameRatingBox } from '../GameRatingBox/GameRatingBox'
import { IconRating, IconComment, IconUser } from '../Icons/Icons'
import { getGameRoute } from '../../../utils/routeUtils'
import Link from 'next/link'
import { GameLink } from '../GameLink/GameLink'
import classNames from 'classnames'

export type GameBaseData = Pick<
    Game,
    'id' | 'name' | 'players' | 'amountOfComments' | 'amountOfRatings' | 'averageRating'
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
        display: 'block',
        minWidth: 0,
    },
    rating: {
        width: 40,
        height: 40,
        flexShrink: 0,
        marginRight: 8,
    },
    name: {
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.82rem',
        fontWeight: 700,
        marginTop: 4,
        marginBottom: 5,
    },
    icons: {
        display: 'block',
        color: darkTheme.textDark,
        fontSize: '0.6rem',
    },
    statValue: {
        margin: '0 8px 0 3px',
    },
})

export const GameBaseDataPanel = ({
    className,
    game: { id, name, players, amountOfComments, amountOfRatings, averageRating },
}: Props) => {
    const classes = useStyles()
    return (
        <GameLink game={{ id, name }} className={classNames(classes.wrapper, className)}>
            <GameRatingBox amountOfRatings={amountOfRatings} rating={averageRating} className={classes.rating} />
            <span className={classes.rightWrapper}>
                <span className={classes.name}>{name}</span>
                <span className={classes.icons}>
                    <IconUser />
                    <span className={classes.statValue}>{players}</span>
                    <IconComment />
                    <span className={classes.statValue}>{amountOfComments}</span>
                    <IconRating />
                    <span className={classes.statValue}>{amountOfRatings} x</span>
                </span>
            </span>
        </GameLink>
    )
}
