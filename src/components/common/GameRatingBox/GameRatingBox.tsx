import React from 'react'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
import { darkTheme } from 'src/theme/darkTheme'
import { getRatingGrade } from 'src/utils/ratingUtils'
import { componentTestIds } from '../../componentTestIds'

interface Props {
    readonly rating?: number
    readonly className?: string
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
    notRated: {
        backgroundColor: darkTheme.ratingNotRated,
    },
    mediocre: {
        backgroundColor: darkTheme.ratingMediocre,
    },
    average: {
        backgroundColor: darkTheme.ratingAverage,
    },
    great: {
        backgroundColor: darkTheme.ratingGreat,
    },
})

export const GameRatingBox = ({ rating, className }: Props) => {
    const classes = useStyles()

    const ratingGrade = getRatingGrade(rating)
    const classNames = {
        [classes.rating]: true,
        [className || '_']: !!className,
        [classes.notRated]: ratingGrade === 'notrated',
        [classes.mediocre]: ratingGrade === 'mediocre',
        [classes.average]: ratingGrade === 'average',
        [classes.great]: ratingGrade === 'great',
    }

    return (
        <div className={classnames(classNames)} data-testid={componentTestIds.gameRatingBox.wrapper}>
            <span>{rating ? (rating / 10).toFixed(1) : '-'}</span>
        </div>
    )
}
