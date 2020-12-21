import React from 'react'

import { Game, Rating } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Maybe } from 'graphql/jsutils/Maybe'
import { darkTheme } from '../../theme/darkTheme'
import { GameRatingBox, ratingStyles } from '../common/GameRatingBox/GameRatingBox'
import { IconUser } from '../common/Icons/Icons'
import { getRatingForGame, MIN_NUM_RATINGS } from '../../utils/ratingUtils'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import RatingStateButtons from './RatingStateButtons'
import RatingStars from './RatingStars'

interface Props {
    readonly game: Pick<Game, 'id' | 'averageRating' | 'amountOfRatings' | 'ratingStats'> & {
        currentUsersRating?: Maybe<Pick<Rating, 'rating' | 'state'>>
    }
}

const useStyles = createUseStyles({
    wrapper: {
        color: darkTheme.text,
        fontSize: '0.8rem',
        textAlign: 'center',
    },
    row: {
        display: 'flex',
        marginBottom: 25,
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        width: 150,
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
    yourRating: {
        marginBottom: 25,
    },
    ...ratingStyles,
})

export const GameRatingPanel = ({
    game: { id: gameId, averageRating, amountOfRatings, ratingStats, currentUsersRating },
}: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const loggedInUser = useLoggedInUser()

    const max = ratingStats.reduce((currentMax, rating) => Math.max(currentMax, rating.count), 0)
    let statsMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    if (amountOfRatings >= MIN_NUM_RATINGS) {
        // Compute stats only when we have enough ratings
        statsMap = ratingStats.reduce((map, entry) => {
            // eslint-disable-next-line no-param-reassign
            map[10 - entry.rating] = Math.round((entry.count * 100) / max)
            return map
        }, statsMap)
    }

    const ratingNum = currentUsersRating?.rating ?? 0
    const rating = ratingNum || '-'
    const ratingState = currentUsersRating?.state ?? 0

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
                    {loggedInUser && (
                        <span className={classes.yourRating}>{t('GameDetail.yourRating', { rating })}</span>
                    )}
                    {loggedInUser && <RatingStateButtons gameId={gameId} state={ratingState} />}
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
            {!loggedInUser && <div className={classes.login}>{t('GameDetail.logInToRate')}</div>}
            {loggedInUser?.id && <RatingStars gameId={gameId} rating={ratingNum} />}
        </div>
    )
}
