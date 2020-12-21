import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { UserContext, UserContextShape, UserContextValue } from './UserContext'
import {
    LoggedInUserQuery,
    LoggedInUserQueryVariables,
    UserRole,
} from '../../../graphql/__generated__/typescript-operations'

const loggedInUserGql = require('./graphql/loggedInUserQuery.graphql')

const UserContextProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<UserContextValue | undefined>(undefined)
    const query = useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(loggedInUserGql, {
        ssr: false,
        onCompleted: data => {
            const { loggedInUser } = data
            if (loggedInUser) {
                setValue({
                    id: loggedInUser.id,
                    name: loggedInUser.name,
                    nickName: loggedInUser.nickname ?? undefined,
                    imageId: loggedInUser.image?.id,
                    role: loggedInUser.role ?? UserRole.Anonymous,
                })
            }
        },
    })
    const { loading } = query

    const providerValue: UserContextShape | undefined = useMemo(() => {
        if (!value && !loading) {
            return undefined
        }

        return {
            value: value ?? {},
            actions: {
                reload: () => {
                    query.refetch()
                },
            },
        }
    }, [value, loading])

    return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
}

export default UserContextProvider
