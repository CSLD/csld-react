import React from 'react'
import fetch from 'isomorphic-unfetch'
import { ApolloClient, createHttpLink, InMemoryCache, from, InMemoryCacheConfig } from '@apollo/react-hooks'
import withApollo from 'next-with-apollo'
import { onError } from '@apollo/client/link/error'
import { toastContextValue } from '../context/ToastContext/ToastContext'
import GraphQLErrorContent, {
    PropsFromGraphQLError,
} from '../components/common/GraphQLErrorContent/GraphQLErrorContent'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

// Operations that do their own error handling
const errorHandlingOperations = ['ChangePassword']

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
    const hasCustomErrorHandling = errorHandlingOperations.includes(operation.operationName)

    if (networkError) {
        if (response && !hasCustomErrorHandling) {
            response.errors = undefined
        }
        toastContextValue.actions.showToast(<GraphQLErrorContent errorClass="NETWORK" />, 'alert')
    }

    if (!hasCustomErrorHandling) {
        if (graphQLErrors && graphQLErrors.length > 0) {
            if (graphQLErrors[0].extensions?.code) {
                const { errorClass, valuePath } = PropsFromGraphQLError(graphQLErrors[0])
                if (response) {
                    response.errors = undefined
                }
                toastContextValue.actions.showToast(
                    <GraphQLErrorContent errorClass={errorClass} valuePath={valuePath} />,
                    'alert',
                )
            } else {
                if (response) {
                    response.errors = undefined
                }
                toastContextValue.actions.showToast(<GraphQLErrorContent errorClass="UNKNOWN" />, 'alert')
            }
        }
    }
})

const simpleMerge = { merge: (existing: any, incoming: any) => ({ ...existing, ...incoming }) }
const overwriteMerge = { merge: (existing: any, incoming: any) => incoming }

const cacheConfig: InMemoryCacheConfig = {
    typePolicies: {
        Query: {
            fields: {
                games: simpleMerge,
                admin: simpleMerge,
                homepage: simpleMerge,
            },
        },
        Mutation: {
            fields: {
                user: simpleMerge,
                game: simpleMerge,
                group: simpleMerge,
                event: simpleMerge,
                admin: simpleMerge,
            },
        },
        Game: {
            fields: {
                ratingStats: overwriteMerge,
                ratings: overwriteMerge,
            },
        },
    },
}

export const withApolloWrapper = withApollo(props => {
    const { initialState } = props
    let uri = 'http://localhost:3000/graphql' // Fallback

    if (global.window) {
        // Do requests back to origin
        uri = `${global.window.location.origin}/graphql`
    } else if (props.headers?.host) {
        const host = props.headers?.['x-forwarded-host'] || props.headers?.host
        if (host) {
            const protocol = host.indexOf('localhost') >= 0 ? 'http://' : 'https://'
            uri = `${protocol}${host}/graphql`
        }
    }

    return new ApolloClient({
        link: from([
            errorLink,
            createHttpLink({
                uri,
                credentials: 'same-origin',
            }),
        ]),
        cache: new InMemoryCache(cacheConfig).restore(initialState || {}),
    })
})
