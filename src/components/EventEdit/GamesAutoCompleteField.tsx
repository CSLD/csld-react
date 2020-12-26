import React from 'react'
import { FieldValidator } from 'final-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import {
    AutoCompleteGamesQuery,
    AutoCompleteGamesQueryVariables,
    Game,
} from '../../graphql/__generated__/typescript-operations'
import FormAutoCompleteField from '../common/form/FormAutoCompleteField'
import { useRoutes } from '../../hooks/useRoutes'

const autoCompleteGamesGql = require('./graphql/autoCompleteGames.graphql')

export interface LinkedGame {
    readonly id: string
    readonly name: string
    readonly itemLabel: string
}

interface Props {
    readonly name: string
    readonly placeholder?: string
    readonly hint?: string
    readonly validate?: FieldValidator<LinkedGame[]>
}

export const createGameLabel = ({ name, year }: Pick<Game, 'name' | 'year'>) => `${name ?? ''} (${year ?? '?'})`

const GamesAutoCompleteField = ({ name, placeholder, hint, validate }: Props) => {
    const { t } = useTranslation('common')
    const routes = useRoutes()
    const { loading, refetch } = useQuery<AutoCompleteGamesQuery, AutoCompleteGamesQueryVariables>(
        autoCompleteGamesGql,
        {
            skip: true,
        },
    )

    const handleSearch = async (query: string) =>
        refetch({
            query,
            offset: 0,
            limit: 7,
        }).then(data =>
            data.data.games.byQuery.map(game => ({
                ...game,
                name: game.name ?? '',
                itemLabel: createGameLabel(game),
            })),
        )

    const handleCreate = () => {}

    return (
        <>
            <FormAutoCompleteField<LinkedGame>
                name={name}
                onCreateNew={handleCreate}
                onSearch={handleSearch}
                placeholder={placeholder}
                hint={hint}
                createUrl={item => routes.gameDetail(item.id, item.name).as}
                createNewText={t('EventEdit.createGame')}
                validate={validate}
                loading={loading}
                entityLinkText={t('EventEdit.gameLink')}
            />
        </>
    )
}

export default GamesAutoCompleteField
