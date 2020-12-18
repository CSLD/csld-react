import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { CheckEmailQuery, CheckEmailQueryVariables } from '../graphql/__generated__/typescript-operations'

const checkEmailGql = require(`./graphql/checkEmailQuery.graphql`)

export const useIsEmailAvailable = () => {
    const [usedByName, setUsedByName] = useState('')
    const client = useApolloClient()

    const isEmailAvailable = async (email: string | undefined, currentUserId?: string) => {
        if (email) {
            // Check whether user exists
            const result = await client.query<CheckEmailQuery, CheckEmailQueryVariables>({
                query: checkEmailGql,
                variables: { email },
                fetchPolicy: 'network-only',
            })

            const { userByEmail } = result.data
            if (userByEmail && userByEmail.id !== currentUserId) {
                // Email used by someone other than the current user
                setUsedByName(userByEmail.person.name)
                return false
            }
        }
        setUsedByName('')
        return true
    }

    return { usedByName, isEmailAvailable }
}
