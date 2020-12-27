import React, { useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useApolloClient, useQuery } from '@apollo/client'
import { createUseStyles } from 'react-jss'
import { Form as FinalForm } from 'react-final-form'
import classNames from 'classnames'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { TabDefinition, Tabs } from '../common/Tabs/Tabs'
import {
    LadderGameDataFragment,
    LadderInitialGamesQuery,
    LadderInitialGamesQueryVariables,
    LadderMoreGamesQuery,
    LadderMoreGamesQueryVariables,
    LadderType,
} from '../../graphql/__generated__/typescript-operations'
import LadderGamePanel from './LadderGamePanel'
import { darkTheme } from '../../theme/darkTheme'
import { labelMapper } from '../../hooks/usePredefinedLabels'
import LabelFilterFields from '../common/LabelFilterFields/LabelFilterFields'
import Pager from '../common/Pager/Pager'
import { useRoutes } from '../../hooks/useRoutes'
import { LabelFromGql } from '../common/LabelsEditColumn/LabelsEditColumn'

const ladderInitialGames = require('./graphql/ladderInitialGames.graphql')
const ladderMoreGames = require('./graphql/ladderMoreGames.graphql')

interface Props {
    readonly ladderType: LadderType
    readonly initialRequiredLabelIds?: string[]
    readonly initialOptionalLabelIds?: string[]
}

interface FormValues {
    requiredLabels: string[]
    optionalLabels: string[]
}

const useStyles = createUseStyles({
    row: {
        backgroundColor: darkTheme.backgroundWhite,
    },
    widthFixer: {
        padding: '20px 0',
    },
    loading: {
        opacity: 0.5,
    },
})

const PAGE_SIZE = 25

type Page = Partial<{
    games: LadderGameDataFragment[]
    totalAmount: number
}>

const LadderPanel = ({ ladderType, initialRequiredLabelIds, initialOptionalLabelIds }: Props) => {
    const { t } = useTranslation('common')
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<Page>({})
    const [requiredLabels, setRequiredLabels] = useState<LabelFromGql[] | undefined>(undefined)
    const [optionalLabels, setOptionalLabels] = useState<LabelFromGql[] | undefined>(undefined)
    const classes = useStyles()
    const client = useApolloClient()
    const routes = useRoutes()
    const initialValues = useMemo(
        () =>
            ({
                requiredLabels: initialRequiredLabelIds || [],
                optionalLabels: initialOptionalLabelIds || [],
            } as FormValues),
        [initialRequiredLabelIds, initialOptionalLabelIds],
    )

    useQuery<LadderInitialGamesQuery, LadderInitialGamesQueryVariables>(ladderInitialGames, {
        variables: {
            ladderType,
            requiredLabels: initialRequiredLabelIds,
            optionalLabels: initialOptionalLabelIds,
            offset: 0,
            limit: PAGE_SIZE,
        },
        ssr: false,
        onCompleted: response => {
            setPage(response.games.ladder)
            setRequiredLabels(response.authorizedRequiredLabels?.map(labelMapper))
            setOptionalLabels(response.authorizedOptionalLabels?.map(labelMapper))
        },
    })

    const tabs = useMemo(
        () =>
            [
                {
                    key: LadderType.RecentAndMostPlayed,
                    title: t('Ladder.recentAndMostPlayedTab'),
                },
                {
                    key: LadderType.Recent,
                    title: t('Ladder.recent'),
                },
                {
                    key: LadderType.Best,
                    title: t('Ladder.best'),
                },
                {
                    key: LadderType.MostPlayed,
                    title: t('Ladder.mostPlayed'),
                },
                {
                    key: LadderType.MostCommented,
                    title: t('Ladder.mostCommented'),
                },
            ] as TabDefinition<LadderType>[],
        [t],
    )

    const { games } = page

    return (
        <FinalForm<FormValues> initialValues={initialValues} onSubmit={() => {}}>
            {({ values }) => {
                const refreshList = ({
                    newOffset,
                    newRequiredLabels,
                    newOptionalLabels,
                }: {
                    newOffset?: number
                    newRequiredLabels?: string[]
                    newOptionalLabels?: string[]
                }) => {
                    setLoading(true)
                    client
                        .query<LadderMoreGamesQuery, LadderMoreGamesQueryVariables>({
                            query: ladderMoreGames,
                            variables: {
                                ladderType,
                                offset: newOffset !== undefined ? newOffset : offset,
                                limit: PAGE_SIZE,
                                requiredLabels: newRequiredLabels || values.requiredLabels,
                                optionalLabels: newOptionalLabels || values.optionalLabels,
                            },
                        })
                        .then(response => {
                            setPage(response.data.games.ladder)
                            setLoading(false)
                        })
                }

                const handleTabSwitch = (newLadderType: LadderType) => {
                    routes.push(routes.games(newLadderType, values.requiredLabels, values.optionalLabels))
                }

                const handleOffsetChanged = (newOffset: number) => {
                    setOffset(newOffset)
                    refreshList({ newOffset })
                }

                return (
                    <>
                        <Tabs<LadderType> tabs={tabs} selectedTab={ladderType} onSelectTab={handleTabSwitch} />
                        <div className={classes.row}>
                            <WidthFixer
                                className={classNames({ [classes.widthFixer]: true, [classes.loading]: loading })}
                            >
                                {games && requiredLabels && optionalLabels && (
                                    <Row>
                                        <Col md={9}>
                                            {games.map(game => (
                                                <LadderGamePanel key={game.id} game={game} />
                                            ))}
                                            <Pager
                                                currentOffset={offset}
                                                pageSize={PAGE_SIZE}
                                                totalAmount={page.totalAmount ?? 0}
                                                onOffsetChanged={handleOffsetChanged}
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <LabelFilterFields
                                                requiredLabelList={requiredLabels}
                                                optionalLabelList={optionalLabels}
                                                onSelectionChanged={refreshList}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </WidthFixer>
                        </div>
                    </>
                )
            }}
        </FinalForm>
    )
}

export default LadderPanel
