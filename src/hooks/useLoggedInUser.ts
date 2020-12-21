import { useQuery } from '@apollo/client'
import { LoggedInUserHookQuery } from '../graphql/__generated__/typescript-operations'

const loggedInUserGql = require('./graphql/loggedInUser.graphql')

/**
 * Get logged in user from graphql cache (relies on user being loaded by header)
 *
 * @returns Logged in user data, undefined when not logged in, Empty object when loading
 */
export const useLoggedInUser = () => {
    const query = useQuery<LoggedInUserHookQuery>(loggedInUserGql, {
        fetchPolicy: 'cache-only',
        ssr: false,
    })

    if (query.loading) {
        return {}
    }

    const user = query.data?.loggedInUser

    if (!user) {
        return undefined
    }

    return {
        id: user.id,
        name: user.person.name,
        role: user.role,
    }
}
