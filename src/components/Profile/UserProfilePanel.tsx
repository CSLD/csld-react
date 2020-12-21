import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { Col, Row } from 'react-bootstrap'
import {
    BaseGameDataFragment,
    CommentsPaged,
    GameDetailCommentFragment,
    Maybe,
    UserProfileDataFragment,
} from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'
import UserDetailPanel from './UserDetailPanel'
import UserProfileTabs from './UserProfileTabs'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { GameBaseDataPanel } from '../common/GameBaseDataPanel/GameBaseDataPanel'
import UserPagedCommentsPanel from './UserPagedCommentsPanel'
import { GameListPanel } from '../common/GameListPanel/GameListPanel'
import { DetailListHeader } from '../common/DetailListHeader/DetailListHeader'

export type UserProfileUser = Maybe<
    { __typename?: 'User' } & {
        commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                comments: Array<
                    { __typename?: 'Comment' } & {
                        game: { __typename?: 'Game' } & BaseGameDataFragment
                    } & GameDetailCommentFragment
                >
            }
    } & UserProfileDataFragment
>

interface Props {
    readonly userId?: string
    readonly user?: UserProfileUser
    readonly profileOnly?: boolean
}

const useStyles = createUseStyles({
    details: {
        backgroundColor: darkTheme.backgroundNearWhite,
        minHeight: 200,
        paddingTop: 20,
        paddingBottom: 20,
    },
    authoredGames: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -20,
        marginBottom: 30,
    },
    authoredGame: {
        width: 425,
        margin: '10px 20px 10px 0',
    },
    ical: {
        fontSize: '0.75rem',
        margin: '15px 0 15px 15px',
    },
})

const UserProfilePanel = ({ userId, user, profileOnly }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const [iCal, setICal] = useState('')

    const playedGames = useMemo(() => user && user.playedGames.map(playedGame => playedGame.game), [user])
    const playedGameRatings = useMemo(
        () =>
            user
                ? user.playedGames.reduce((map, playedGame) => {
                      // eslint-disable-next-line no-param-reassign
                      map[playedGame.game.id] = playedGame.rating ?? undefined
                      return map
                  }, {} as { [key: string]: number | undefined })
                : undefined,
        [user],
    )
    useEffect(() => {
        // We do this in useEffect so that this code is not called on server where window is not available
        setICal(`${window.location.protocol}${window.location.host}/ical?id=${userId}`)
    }, [userId])

    return (
        <>
            <UserDetailPanel
                userData={
                    user
                        ? {
                              id: user.id,
                              image: user.image ?? undefined,
                              name: user.name,
                              nickname: user.nickname,
                              email: user.email,
                              birthDate: user.birthDate,
                              amountOfCreated: user.authoredGames?.length ?? 0,
                              amountOfPlayed: user.amountOfPlayed,
                          }
                        : undefined
                }
            />
            <UserProfileTabs selectedTab="profile" profileOnly={profileOnly} />
            <div className={classes.details}>
                <WidthFixer>
                    <Row>
                        <Col md={9}>
                            {user && (user.authoredGames?.length ?? 0) > 0 && (
                                <div className={classes.authoredGames}>
                                    {user.authoredGames.map(game => (
                                        <GameBaseDataPanel
                                            key={game.id}
                                            game={game}
                                            className={classes.authoredGame}
                                            variant="light"
                                        />
                                    ))}
                                </div>
                            )}
                            {user && (
                                <UserPagedCommentsPanel
                                    userId={user.id}
                                    firstPage={user.commentsPaged as CommentsPaged}
                                />
                            )}
                        </Col>
                        <Col>
                            {playedGames && (
                                <GameListPanel
                                    titleKey="UserDetail.gamesPlayed"
                                    games={playedGames}
                                    ratingMap={playedGameRatings}
                                />
                            )}
                            {user && <GameListPanel titleKey="UserDetail.gamesWanted" games={user.wantedGames} />}
                            <DetailListHeader>{t('UserDetail.wantedICal')}</DetailListHeader>
                            {iCal && <div className={classes.ical}>{iCal}</div>}
                        </Col>
                    </Row>
                </WidthFixer>
            </div>
        </>
    )
}

export default UserProfilePanel
