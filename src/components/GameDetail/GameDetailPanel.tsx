import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { createUseStyles } from 'react-jss'
import {
    CachedGameDataFragment,
    CommentsPaged,
    GameDetailQuery,
    GameDetailQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../theme/darkTheme'
import { TabDefinition, Tabs } from '../common/Tabs/Tabs'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { GameHeaderPanel } from './GameHeaderPanel'
import { GameRatingPanel } from './GameRatingPanel'
import { GameListPanel } from '../common/GameListPanel/GameListPanel'
import { EventListPanel } from '../HomePage/EventListPanel'
import { PAGE_SIZE, GamePagedCommentsPanel } from './GamePagedCommentsPanel'

const cachedGameDataFragment = require('./graphql/cachedGameData.graphql')
const gameDetailQuery = require('./graphql/gameDetail.graphql')

interface Props {
    readonly gameId: string
}

const useStyles = createUseStyles({
    details: {
        backgroundColor: darkTheme.background,
    },
    detailsWidthFixer: {
        display: 'flex',
        padding: '10px 20px 20px',
    },
    detailsLeft: {
        width: 700,
        marginRight: 100,
    },
    detailsRight: {
        paddingTop: 10,
    },
    extras: {
        backgroundColor: darkTheme.backgroundNearWhite,
    },
    extrasWidthFixer: {
        display: 'flex',
    },
    extrasLeft: {
        width: '75%',
        padding: '25px 0 20px',
    },
    extrasRight: {
        width: '25%',
        boxSizing: 'border-box',
        padding: '25px 0 20px 20px',
    },
})

type TabTabs = 'comments' | 'photos' | 'video'

const tabComments: TabDefinition<TabTabs> = {
    key: 'comments',
    title: {
        key: 'GameDetail.comments',
    },
}

const tabPhotos: TabDefinition<TabTabs> = {
    key: 'photos',
    title: {
        key: 'GameDetail.photos',
    },
}

const tabVideo: TabDefinition<TabTabs> = {
    key: 'video',
    title: {
        key: 'GameDetail.video',
    },
}

const emptyGame = {
    name: '',
    labels: [],
    authors: [],
    groupAuthor: [],
    averageRating: 0,
    amountOfRatings: 0,
    ratingStats: [],
    similarGames: [],
    gamesOfAuthors: [],
    events: [],
    photos: [],
    video: undefined,
    commentsPaged: {
        comments: [],
        totalAmount: -1,
    } as CommentsPaged,
}

export const GameDetailPanel = ({ gameId }: Props) => {
    const [selectedTab, setSelectedTab] = useState<TabTabs>('comments')
    const classes = useStyles()
    const gameQuery = useQuery<GameDetailQuery, GameDetailQueryVariables>(gameDetailQuery, {
        variables: {
            gameId,
            commentsLimit: PAGE_SIZE,
        },
        fetchPolicy: 'cache-and-network',
        ssr: false, // Next threw errors about mismatching content while game page was reloaded
    })
    let gameFragment: CachedGameDataFragment | undefined | null

    try {
        // Throws exception on server, so we guard it
        gameFragment = gameQuery.client.readFragment<CachedGameDataFragment>({
            id: `Game:${gameId}`,
            fragment: cachedGameDataFragment,
        })
    } catch (e) {
        // Object in cache but does not have required data - just continue
        console.log('Fetch failed', e)
    }

    const game = gameQuery.data?.gameById || {
        ...emptyGame,
        ...gameFragment,
        id: `${gameId}`,
    }

    const tabs: Array<TabDefinition<TabTabs>> = [tabComments]
    if (game.video?.path) {
        tabs.push(tabVideo)
    }

    return (
        <>
            <div className={classes.details}>
                <WidthFixer className={classes.detailsWidthFixer}>
                    <div className={classes.detailsLeft}>{game.name && <GameHeaderPanel game={game} />}</div>
                    <div className={classes.detailsRight}>
                        <GameRatingPanel game={game} />
                    </div>
                </WidthFixer>
                <Tabs tabs={tabs} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
                <div className={classes.extras}>
                    <WidthFixer className={classes.extrasWidthFixer}>
                        <div className={classes.extrasLeft}>
                            {selectedTab === 'comments' && (
                                <GamePagedCommentsPanel
                                    gameId={gameId}
                                    firstPage={
                                        game.commentsPaged.totalAmount >= 0
                                            ? (game.commentsPaged as CommentsPaged)
                                            : undefined
                                    }
                                />
                            )}
                            {selectedTab === 'video' && (
                                <iframe title="video" src={game.video?.path || ''} width="800" height="450" />
                            )}
                        </div>
                        <div className={classes.extrasRight}>
                            <GameListPanel games={game.similarGames} titleKey="GameDetail.similarGames" />
                            <EventListPanel events={game.events} titleKey="GameDetail.events" />
                            <GameListPanel games={game.gamesOfAuthors} titleKey="GameDetail.gamesOfAuthors" />
                        </div>
                    </WidthFixer>
                </div>
            </div>
        </>
    )
}
