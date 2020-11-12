import { Game } from '../graphql/__generated__/typescript-operations'

export const getGameRoute = ({ id, name }: Pick<Game, 'id' | 'name'>) => {
    const stripped = (name || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/-$/g, '')
    return `/larp/${stripped}/cs/${id}`
}
