import React from 'react'

import { Game } from 'src/graphql/__generated__/typescript-operations'
import Link from 'next/link'
import { getGameRoute } from '../../../utils/routeUtils'

interface Props {
    readonly game: Pick<Game, 'id' | 'name'>
    readonly className?: string
}

export const GameLink: React.FC<Props> = ({ game, className, children }) => (
    <Link href={{ pathname: '/gameDetail', query: { id: game.id } }} as={getGameRoute(game)}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={className}>{children}</a>
    </Link>
)
