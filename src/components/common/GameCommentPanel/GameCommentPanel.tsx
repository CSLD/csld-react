import React from 'react'
import { createUseStyles } from 'react-jss'
import { format } from 'date-fns-tz'
import { Comment, Game, Image, Person, User } from '../../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../../theme/darkTheme'
import { ProfileImage } from '../ProfileImage/ProfileImage'
import { parseDateTime } from '../../../utils/dateUtils'
import { useTranslation } from 'react-i18next'
import { GameRatingBox } from '../GameRatingBox/GameRatingBox'
import { GameLink } from '../GameLink/GameLink'
import classNames from 'classnames'
import UserLink from '../UserLink'

interface Props {
    readonly comment: Pick<Comment, 'id' | 'comment' | 'added' | 'amountOfUpvotes' | 'isHidden'> & {
        readonly user: Pick<User, 'id'> & {
            readonly person: Pick<Person, 'nickname' | 'name'>
            readonly image?: Pick<Image, 'id'> | null
        }
        readonly game: Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings'>
    }
}

const useStyles = createUseStyles({
    wrapper: {
        borderBottom: `1px solid ${darkTheme.backgroundAlmostNearWhite}`,
        padding: '10px 15px',
        color: darkTheme.textOnLightDark,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    headerMiddle: {
        lineHeight: '180%',
        color: darkTheme.text,
        fontSize: '0.75rem',
    },
    headerNameWrapper: {
        display: 'block',
        borderRadius: 3,
        backgroundColor: darkTheme.backgroundWhite,
        overflow: 'hidden',
    },
    headerNickName: {
        padding: '3px 5px',
        fontWeight: 700,
        backgroundColor: darkTheme.textGreen,
        color: darkTheme.textLight,
        fontSize: '0.9rem',
    },
    headerName: {
        padding: '3px 5px',
        fontWeight: 700,
        color: darkTheme.textDark,
        fontSize: '0.70rem',
    },
    text: {
        margin: '0 0 10px',
        fontSize: '0.75rem',
    },
    headerLikes: {
        flexGrow: 1,
        fontSize: '1rem',
        alignSelf: 'flex-start',
        color: darkTheme.textDark,
        height: '100%',
        textAlign: 'right',
    },
    likesCircle: {
        display: 'inline-block',
        textAlign: 'center',
        minWidth: 30,
        height: 30,
        paddingTop: 3,
        borderRadius: 15,
        padding: 5,
        backgroundColor: darkTheme.backgroundWhite,
    },
    game: {
        display: 'flex',
        fontSize: '0.75rem',
        alignItems: 'center',
    },
    rating: {
        margin: '0 5px',
    },
    gameName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        flexShrink: 1,
        color: darkTheme.textGreenDark,

        '&:hover': {
            color: darkTheme.textOnLight,
        },
    },
})

const GameCommentPanel = ({ comment }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const added = format(parseDateTime(comment.added) || 0, 'dd.MM.yyyy')

    const { nickname, name } = comment.user.person
    const { game } = comment

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <ProfileImage userId={comment.user.id} imageId={comment.user.image?.id} />
                <div className={classes.headerMiddle}>
                    <UserLink userId={comment.user.id} className={classes.headerNameWrapper}>
                        <span className={classes.headerNickName}>{nickname || name}</span>
                        <span className={classes.headerName}>{name}</span>
                    </UserLink>
                    {added}
                </div>
                <div className={classes.headerLikes}>
                    <div className={classes.likesCircle}>{comment.amountOfUpvotes}</div>
                </div>
            </div>
            <p className={classes.text} dangerouslySetInnerHTML={{ __html: comment.comment ?? '' }} />
            {game && (
                <div className={classes.game}>
                    {t('Game.aboutGame')}
                    <GameRatingBox
                        amountOfRatings={game.amountOfRatings || 0}
                        rating={game.averageRating}
                        className={classes.rating}
                        size="tiny"
                    />
                    <GameLink game={game} className={classes.gameName}>
                        {game.name}
                    </GameLink>
                </div>
            )}
        </div>
    )
}

export default GameCommentPanel
