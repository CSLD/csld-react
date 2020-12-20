import { useQuery } from '@apollo/client'
import { LoggedInUserHookQuery } from '../graphql/__generated__/typescript-operations'

const loggedInUserGql = require('./graphql/loggedInUser.graphql')

export const useLoggedInUser = () => {
    const query = useQuery<LoggedInUserHookQuery>(loggedInUserGql, {
        fetchPolicy: 'cache-only',
        ssr: false,
    })

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
