import React from 'react'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { darkTheme } from 'src/theme/darkTheme'
import { getRatingForGame, MIN_NUM_RATINGS } from 'src/utils/ratingUtils'
import { componentTestIds } from '../../componentTestIds'

interface Props {
    readonly rating?: number
    readonly amountOfRatings: number
    readonly className?: string
}

export const ratingStyles = {
    ratingNotRated: {
        backgroundColor: darkTheme.ratingNotRated,
    },
    ratingMediocre: {
        backgroundColor: darkTheme.ratingMediocre,
    },
    ratingAverage: {
        backgroundColor: darkTheme.ratingAverage,
    },
    ratingGreat: {
        backgroundColor: darkTheme.ratingGreat,
    },
}

const useStyles = createUseStyles({
    rating: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        fontSize: '0.7rem',
        fontWeight: 'bold',
        color: darkTheme.textLight,
    },
    ...ratingStyles,
})

export const GameRatingBox = ({ rating, amountOfRatings, className }: Props) => {
    const classes = useStyles()

    const ratingGrade = getRatingForGame(amountOfRatings, rating)
    const classNames = {
        [classes.rating]: true,
        [className || '_']: !!className,
        [classes.ratingNotRated]: ratingGrade === 'notrated',
        [classes.ratingMediocre]: ratingGrade === 'mediocre',
        [classes.ratingAverage]: ratingGrade === 'average',
        [classes.ratingGreat]: ratingGrade === 'great',
    }
    const clippedRating = amountOfRatings < MIN_NUM_RATINGS ? 0 : rating

    return (
        <div className={classnames(classNames)} data-testid={componentTestIds.gameRatingBox.wrapper}>
            <span>{clippedRating ? (clippedRating / 10).toFixed(1) : '-'}</span>
        </div>
    )
}
