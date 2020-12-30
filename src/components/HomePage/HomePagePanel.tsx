import React, { useMemo, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/client'
import isInBrowser from 'is-in-browser'
import { darkTheme } from '../../theme/darkTheme'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { HomePageGamesPanel } from './HomePageGamesPanel'
import { HomePageEventsPanel } from './HomePageEventsPanel'
import { HomePageCommentsPanel, HPC_COLUMNS, HPC_ROWS_EXPANDED, HPC_ROWS_NORMAL } from './HomePageCommentsPanel'
import {
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables,
    GetMoreLastCommentsQuery,
    GetMoreLastCommentsQueryVariables,
} from '../../graphql/__generated__/typescript-operations'
import { BaseCommentData } from './BaseCommentPanel'
import { TabDefinition, Tabs } from '../common/Tabs/Tabs'

const getHomePageDataQuery = require('./graphql/getHomePageData.graphql')
const getMoreLastCommentsQuery = require('./graphql/getMoreLastComments.graphql')

const useStyles = createUseStyles({
    gamesAndEvents: {
        backgroundColor: darkTheme.background,
    },
    gamesAndEventsInner: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0 35px',
    },
    comments: {
        backgroundColor: darkTheme.backgroundNearWhite,
        padding: '15px 0 35px',
    },
    /*
    pictures: {
        backgroundColor: darkTheme.background,
    },
    picturesInner: {
        padding: '30px 0',
    },
     */
})

const mockComments = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
]

const commentsNormal = HPC_COLUMNS * HPC_ROWS_NORMAL
const commentsExpanded = HPC_COLUMNS * HPC_ROWS_EXPANDED

const getSlicedComments = (
    lastComments: BaseCommentData[] = [],
    moreComments: BaseCommentData[] = [],
    expanded: boolean,
) => {
    const needComments = expanded ? commentsExpanded : commentsNormal

    return [...lastComments, ...moreComments, ...mockComments].slice(0, needComments)
}

const tabs: Array<TabDefinition<'recent'>> = [
    {
        key: 'recent',
        title: {
            key: 'HomePage.recent',
        },
    },
]

export const HomePagePanel = () => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const handleToggleExpanded = () => setExpanded(old => !old)
    const homePageQuery = useQuery<GetHomePageDataQuery, GetHomePageDataQueryVariables>(getHomePageDataQuery, {
        fetchPolicy: 'cache-and-network',
        skip: !isInBrowser,
    })
    const moreCommentsQuery = useQuery<GetMoreLastCommentsQuery, GetMoreLastCommentsQueryVariables>(
        getMoreLastCommentsQuery,
        {
            fetchPolicy: 'cache-and-network',
            skip: !expanded,
            variables: {
                offset: commentsNormal,
                limit: commentsExpanded - commentsNormal,
            },
        },
    )

    const lastAddedGames = homePageQuery.data?.homepage?.lastAddedGames
    const topGames = homePageQuery.data?.homepage?.mostPopularGames
    const nextEvents = homePageQuery.data?.homepage?.nextEvents
    const lastComments = homePageQuery.data?.homepage?.lastComments
    const moreComments = moreCommentsQuery.data?.homepage?.lastComments

    const slicedComments = useMemo(() => getSlicedComments(lastComments, moreComments, expanded), [
        lastComments,
        moreComments,
        expanded,
    ])

    return (
        <>
            <div className={classes.gamesAndEvents}>
                <WidthFixer>
                    <div className={classes.gamesAndEventsInner}>
                        <HomePageGamesPanel lastGames={lastAddedGames} topGames={topGames} />
                        <HomePageEventsPanel nextEvents={nextEvents} />
                    </div>
                </WidthFixer>
            </div>
            <Tabs tabs={tabs} selectedTab="recent" />
            <div className={classes.comments}>
                <HomePageCommentsPanel
                    comments={slicedComments}
                    expanded={expanded}
                    onToggleExpanded={handleToggleExpanded}
                />
            </div>
            {/*
            <div className={classes.pictures}>
                <WidthFixer className={classes.picturesInner} />
            </div>
            */}
        </>
    )
}
