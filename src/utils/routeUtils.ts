import { Game, Event } from '../graphql/__generated__/typescript-operations'

const stripName = (name: string | null | undefined) =>
    (name ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/-$/g, '')

/**
 * Generate SEO route to the game. Do not use directly - use GameLink component!
 *
 * @param id Game ID
 * @param name Game name
 */
export const getGameRoute = ({ id, name }: Pick<Game, 'id' | 'name'>) => `/larp/${stripName(name)}/cs/${id}`

export const getEventRoute = ({ id, name }: Pick<Event, 'id' | 'name'>) => `/event/${stripName(name)}/${id}`
