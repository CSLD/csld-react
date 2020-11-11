import React from 'react'

import { Game } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { darkTheme } from '../../theme/darkTheme'
import { GameRatingBox } from '../common/GameRatingBox/GameRatingBox'
import { IconUser } from '../common/Icons/Icons'

interface Props {
    readonly game: Pick<Game, 'totalRating' | 'amountOfRatings' | 'ratingStats' | 'amountOfPlayed'>
}

const useStyles = createUseStyles({
    wrapper: {
        color: darkTheme.text,
        fontSize: '0.8rem',
        textAlign: 'center',
        width: 400,
    },
    row: {
        display: 'flex',
        marginBottom: 30,
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        width: 150,
        padding: '0 10px',
        textAlign: 'center',
    },
    right: {
        width: 245,
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
    },
    statsRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    statsNum: {
        width: 20,
        marginRight: 5,
        textAlign: 'right',
    },
    statHolder: {
        width: 170,
        height: 20,
        backgroundColor: darkTheme.backgroundControl,
        borderRadius: 4,
    },
    statRed: {
        height: '100%',
        backgroundColor: darkTheme.red,
        borderRadius: 4,
    },
    login: {
        textAlign: 'center',
    },
    totalPlayed: {
        margin: '20px 0 10px',
    },
})

export const GameRatingPanel = ({ game: { totalRating, amountOfRatings, amountOfPlayed, ratingStats } }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    const max = ratingStats.reduce((currentMax, rating) => Math.max(currentMax, rating.rating), 0)
    const statsMap = ratingStats.reduce(
        (map, entry) => {
            // eslint-disable-next-line no-param-reassign
            map[10 - entry.rating] = Math.round((entry.count * 100) / max)
            return map
        },
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    )

    return (
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <div className={classes.left}>
                    <GameRatingBox amountOfRatings={amountOfRatings} rating={totalRating} size="big" />
                    <span className={classes.totalPlayed}>
                        <IconUser />
                        &nbsp;&nbsp;
                        {t('GameDetail.totalPlayed', { amountOfPlayed })}
                    </span>
                </div>
                <div className={classes.right}>
                    {statsMap.map((size, n) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className={classes.statsRow} key={`rating_${n}`}>
                            <div className={classes.statsNum}>{10 - n}</div>
                            <div className={classes.statHolder}>
                                <div className={classes.statRed} style={{ width: size }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <span className={classes.login}>{t('GameDetail.logInToRate')}</span>
        </div>
    )
}
