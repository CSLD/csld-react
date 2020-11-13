import React from 'react'
import { createUseStyles } from 'react-jss'
import { format } from 'date-fns-tz'
import { Comment, Image, Person, User } from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'
import { ProfileImage } from '../common/ProfileImage/ProfileImage'
import { parseDateTime } from '../../utils/dateUtils'

interface Props {
    readonly comment: Pick<Comment, 'id' | 'comment' | 'added' | 'amountOfUpvotes' | 'isHidden'> & {
        user: Pick<User, 'id'> & {
            person: Pick<Person, 'nickname' | 'name'>
            image?: Pick<Image, 'id'> | null
        }
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
        minWidth: 20,
        height: 19,
        paddingTop: 6,
        borderRadius: 15,
        padding: 5,
        backgroundColor: darkTheme.backgroundWhite,
    },
})

export const GameCommentPanel = ({ comment }: Props) => {
    const classes = useStyles()
    const added = format(parseDateTime(comment.added) || 0, 'dd.MM.yyyy')

    const { nickname, name } = comment.user.person

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <ProfileImage userId={comment.user.id} imageId={comment.user.image?.id} />
                <div className={classes.headerMiddle}>
                    <div className={classes.headerNameWrapper}>
                        <span className={classes.headerNickName}>{nickname || name}</span>
                        <span className={classes.headerName}>{name}</span>
                    </div>
                    {added}
                </div>
                <div className={classes.headerLikes}>
                    <div className={classes.likesCircle}>{comment.amountOfUpvotes}</div>
                </div>
            </div>
            <p className={classes.text} dangerouslySetInnerHTML={{ __html: comment.comment ?? '' }} />
        </div>
    )
}
