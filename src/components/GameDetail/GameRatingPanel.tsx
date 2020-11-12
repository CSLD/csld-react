import React from 'react'

import { Game } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { darkTheme } from '../../theme/darkTheme'
import { GameRatingBox, ratingStyles } from '../common/GameRatingBox/GameRatingBox'
import { IconUser } from '../common/Icons/Icons'
import { getRatingForGame } from '../../utils/ratingUtils'

interface Props {
    readonly game: Pick<Game, 'averageRating' | 'amountOfRatings' | 'ratingStats'>
}

const useStyles = createUseStyles({
    wrapper: {
        color: darkTheme.text,
        fontSize: '0.8rem',
        textAlign: 'center',
    },
    row: {
        display: 'flex',
        marginBottom: 30,
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        width: 130,
        padding: '0 10px',
        textAlign: 'center',
    },
    right: {
        width: 200,
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
    statGauge: {
        height: '100%',
        borderRadius: 4,
        transition: 'width 0.3s ease-in',
    },
    login: {
        textAlign: 'center',
        marginBottom: 20,
    },
    totalPlayed: {
        margin: '20px 0 10px',
    },
    ...ratingStyles,
})

export const GameRatingPanel = ({ game: { averageRating, amountOfRatings, ratingStats } }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    const max = ratingStats.reduce((currentMax, rating) => Math.max(currentMax, rating.count), 0)
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
                    <GameRatingBox amountOfRatings={amountOfRatings} rating={averageRating} size="big" />
                    <span className={classes.totalPlayed}>
                        <IconUser />
                        &nbsp;&nbsp;
                        {t('GameDetail.totalPlayed', { amountOfRatings })}
                    </span>
                </div>
                <div className={classes.right}>
                    {statsMap.map((size, n) => {
                        const ratingGrade = getRatingForGame(999, (10 - n) * 10 - 1)
                        const gaugeClassName = classNames({
                            [classes.statGauge]: true,
                            [classes.ratingNotRated]: ratingGrade === 'notrated',
                            [classes.ratingMediocre]: ratingGrade === 'mediocre',
                            [classes.ratingAverage]: ratingGrade === 'average',
                            [classes.ratingGreat]: ratingGrade === 'great',
                        })

                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div className={classes.statsRow} key={`rating_${n}`}>
                                <div className={classes.statsNum}>{10 - n}</div>
                                <div className={classes.statHolder}>
                                    <div className={gaugeClassName} style={{ width: `${size}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.login}>{t('GameDetail.logInToRate')}</div>
        </div>
    )
}
