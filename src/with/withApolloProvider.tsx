import React from 'react'
import fetch from 'isomorphic-unfetch'
import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/react-hooks'
import withApollo from 'next-with-apollo'
import { onError } from '@apollo/client/link/error'
import { toastContextValue } from '../context/ToastContext/ToastContext'
import GraphQLErrorContent from '../components/common/GraphQLErrorContent/GraphQLErrorContent'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

const simpleMerge = { merge: (existing: any, incoming: any) => ({ ...existing, ...incoming }) }
const overwriteMerge = { merge: (existing: any, incoming: any) => incoming }

export type GraphQLExceptionType =
    | 'NETWORK'
    | 'NOT_FOUND'
    | 'INVALID_VALUE'
    | 'INVALID_STATE'
    | 'ACCESS_DENIED'
    | 'DUPLICATE_VALUE'
    | 'UNKNOWN'

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (networkError) {
        if (response) {
            response.errors = undefined
        }
        toastContextValue.actions.showToast(<GraphQLErrorContent errorClass="NETWORK" />, 'alert')
    }

    if (graphQLErrors && graphQLErrors.length > 0 && graphQLErrors[0].extensions?.code) {
        const code = graphQLErrors[0].extensions?.code || 'UNKNOWN'
        const path = graphQLErrors[0].extensions?.path
        if (response) {
            response.errors = undefined
        }
        toastContextValue.actions.showToast(<GraphQLErrorContent errorClass={code} valuePath={path} />, 'alert')
    }
})

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
        cache: new InMemoryCache({
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
        }).restore(initialState || {}),
    })
})
