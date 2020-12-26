import React, { useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/client'
import { labelMapper } from 'src/hooks/usePredefinedLabels'
import { useRoutes } from 'src/hooks/useRoutes'
import GameEditPanel, { FormValues } from './GameEditPanel'
import { darkTheme } from '../../theme/darkTheme'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import {
    Game,
    Group,
    Label,
    LoadGameForEditQuery,
    LoadGameForEditQueryVariables,
    Maybe,
    User,
    Video,
} from '../../graphql/__generated__/typescript-operations'
import { formatAuthorLabel } from './NewAuthorModal'

const loadGameForEditGql = require('./graphql/loadGameForEdit.graphql')

type LoadedGame = Pick<
    Game,
    | 'id'
    | 'name'
    | 'description'
    | 'year'
    | 'players'
    | 'womenRole'
    | 'menRole'
    | 'bothRole'
    | 'hours'
    | 'days'
    | 'web'
    | 'photoAuthor'
    | 'galleryURL'
    | 'ratingsDisabled'
    | 'commentsDisabled'
> & {
    authors: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'nickname'>>
    groupAuthor: Array<{ __typename?: 'Group' } & Pick<Group, 'id' | 'name'>>
    video?: Maybe<{ __typename?: 'Video' } & Pick<Video, 'id' | 'path'>>
    labels: Array<{ __typename?: 'Label' } & Pick<Label, 'id' | 'isRequired'>>
}

const useStyles = createUseStyles({
    row: {
        backgroundColor: darkTheme.backgroundNearWhite,
        padding: '16px 0',
    },
    body: {
        backgroundColor: darkTheme.backgroundWhite,
    },
})

interface Props {
    readonly gameId?: string
}

const formatInt = (value?: number | null) => (typeof value === 'number' ? value.toString() : undefined)

const toInitialValues = (game: LoadedGame): FormValues => ({
    name: game.name ?? undefined,
    description: game.description ?? undefined,
    authors: game.authors.map(author => ({
        name: author.name,
        nickname: author.nickname ?? undefined,
        id: author.id,
        itemLabel: formatAuthorLabel(author),
    })),
    groupAuthors: game.groupAuthor.map(groupAuthor => ({
        id: groupAuthor.id,
        name: groupAuthor.name ?? '',
        itemLabel: groupAuthor.name ?? '',
    })),
    year: formatInt(game.year),
    players: formatInt(game.players),
    womenRole: formatInt(game.womenRole),
    menRole: formatInt(game.menRole),
    bothRole: formatInt(game.bothRole),
    hours: formatInt(game.hours),
    days: formatInt(game.days),
    web: game.web ?? undefined,
    photoAuthor: game.photoAuthor ?? undefined,
    galleryUrl: game.galleryURL ?? undefined,
    ratingsDisabled: game.ratingsDisabled === true,
    commentsDisabled: game.commentsDisabled === true,
    requiredLabels: game.labels.filter(({ isRequired }) => isRequired).map(({ id }) => id),
    optionalLabels: game.labels.filter(({ isRequired }) => !isRequired).map(({ id }) => id),
    newLabels: [],
})

const GameEditPage = ({ gameId }: Props) => {
    const classes = useStyles()
    const routes = useRoutes()
    const { data } = useQuery<LoadGameForEditQuery, LoadGameForEditQueryVariables>(loadGameForEditGql, {
        variables: {
            gameId: gameId || '',
        },
        skip: !gameId,
    })

    const gameById = data?.gameById
    const authorizedOptionalLabels = data?.authorizedOptionalLabels
    const authorizedRequiredLabels = data?.authorizedRequiredLabels
    const initialValues = useMemo(() => (gameById ? toInitialValues(gameById) : undefined), [gameById])
    const existingOptionalLabels = useMemo(
        () => (authorizedOptionalLabels ? authorizedOptionalLabels.map(labelMapper) : undefined),
        [authorizedOptionalLabels],
    )
    const existingRequiredLabels = useMemo(
        () => (authorizedRequiredLabels ? authorizedRequiredLabels.map(labelMapper) : undefined),
        [authorizedRequiredLabels],
    )
    const ready = !gameId || !!initialValues

    const handleGameSaved = (game: Pick<Game, 'id' | 'name'>) => {
        routes.push(routes.gameDetail(game.id, game.name))
    }

    return (
        <div className={classes.row}>
            <WidthFixer className={classes.body}>
                {ready && (
                    <GameEditPanel
                        gameId={gameId}
                        onGameSaved={handleGameSaved}
                        initialValues={initialValues}
                        existingOptionalLabels={existingOptionalLabels}
                        existingRequiredLabels={existingRequiredLabels}
                    />
                )}
            </WidthFixer>
        </div>
    )
}

export default GameEditPage
