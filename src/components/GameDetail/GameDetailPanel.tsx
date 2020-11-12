import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { createUseStyles } from 'react-jss'
import {
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
        padding: 20,
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
        padding: '35px 0 20px',
    },
    extrasRight: {
        width: '25%',
        boxSizing: 'border-box',
        padding: '35px 0 20px 20px',
    },
})

type TabTabs = 'comments' | 'photos'
const tabs: Array<TabDefinition<TabTabs>> = [
    {
        key: 'comments',
        title: {
            key: 'GameDetail.comments',
        },
    },
    {
        key: 'photos',
        title: {
            key: 'GameDetail.photos',
        },
    },
]

export const GameDetailPanel = ({ gameId }: Props) => {
    const [selectedTab, setSelectedTab] = useState<TabTabs>('comments')
    const classes = useStyles()
    const gameQuery = useQuery<Partial<GameDetailQuery>, GameDetailQueryVariables>(gameDetailQuery, {
        variables: {
            gameId: parseInt(gameId, 10),
            commentsLimit: PAGE_SIZE,
        },
        fetchPolicy: 'cache-first',
        returnPartialData: true,
    })

    const game = gameQuery.data?.gameById || {
        id: gameId,
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
        commentsPaged: {
            comments: [],
            totalAmount: 0,
        } as CommentsPaged,
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
                                    gameId={parseInt(gameId, 10)}
                                    firstPage={game.commentsPaged as CommentsPaged}
                                />
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
