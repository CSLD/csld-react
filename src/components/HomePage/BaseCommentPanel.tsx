import React from 'react'
import { Comment, Game, User, Person } from 'src/graphql/__generated__/typescript-operations'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { format } from 'date-fns-tz'
import { darkTheme } from '../../theme/darkTheme'
import { ratingStyles } from '../common/GameRatingBox/GameRatingBox'
import { getRatingForGame } from '../../utils/ratingUtils'

import { parseDateTime } from '../../utils/dateUtils'

export type BaseCommentData = Pick<Comment, 'id' | 'commentAsText' | 'added'> & {
    readonly game: Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings'>
    readonly user: Pick<User, 'id'> & {
        person: Pick<Person, 'name' | 'nickname'>
    }
}

interface Props {
    readonly comment?: BaseCommentData
}

// https://css-tricks.com/line-clampin/
const useStyles = createUseStyles({
    wrapper: {
        width: 377,
        height: 170,
        marginBottom: 20,
    },
    text: {
        padding: 15,
        width: '100%',
        height: 100,
        boxSizing: 'border-box',
        background: darkTheme.backgroundWhite,
        color: darkTheme.textOnLight,
        fontSize: '0.8rem',
        marginBottom: 15,
        lineHeight: '140%',
        borderRadius: 4,
    },
    textInner: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflowWrap: 'break-word',
        overflow: 'hidden',
    },
    more: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 100,
        textAlign: 'right',
        background: 'linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, 1) 70%)',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        color: darkTheme.textDark,
        fontSize: '0.8rem',
    },
    textRow: {
        display: 'flex',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        marginTop: 8,
    },
    profileImage: {
        width: 50,
        height: 50,
        padding: 2,
        margin: '0 15px',
        border: `solid 1px ${darkTheme.text}`,
        borderRadius: '50%',
        boxSizing: 'border-box',
    },
    link: {
        color: darkTheme.textGreen,

        '&:hover': {
            color: darkTheme.textDark,
        },
    },
    textWrapper: {
        minWidth: 0,
    },
    date: {
        marginTop: 5,
        color: darkTheme.text,
        fontSize: '0.7rem',
    },
    gameName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        flexShrink: 1,
    },
    rating: {
        width: 13,
        height: 11,
        borderRadius: 2,
        margin: '0 5px',
    },
    ...ratingStyles,
})

export const BaseCommentPanel = ({ comment }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    const ratingGrade = getRatingForGame(comment?.game?.amountOfRatings || 0, comment?.game?.averageRating)
    const ratingClassNames = {
        [classes.rating]: true,
        [classes.ratingNotRated]: ratingGrade === 'notrated',
        [classes.ratingMediocre]: ratingGrade === 'mediocre',
        [classes.ratingAverage]: ratingGrade === 'average',
        [classes.ratingGreat]: ratingGrade === 'great',
    }
    const added = format(parseDateTime(comment?.added) || 0, 'dd.MM.yyyy')

    return (
        <div className={classes.wrapper}>
            <div className={classes.text}>
                <div className={classes.textInner}>
                    {comment?.commentAsText}
                    {comment && (
                        <a href="/" className={classNames(classes.more, classes.link)}>
                            {t('HomePage.commentMore')}
                        </a>
                    )}
                </div>
            </div>
            <div className={classes.row}>
                <img src="/images/user-icon.png" className={classes.profileImage} alt="" />
                {comment && (
                    <div className={classes.textWrapper}>
                        <div className={classes.textRow}>
                            <a href="/" className={classes.link}>
                                {comment.user.person.nickname || comment.user.person.name}
                            </a>
                            &nbsp;
                            {t('HomePage.commentAbout')}
                            <span className={classNames(ratingClassNames)} />
                            <a href="/" className={classNames(classes.gameName, classes.link)}>
                                {comment.game.name}
                            </a>
                        </div>
                        <div className={classes.date}>{added}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
