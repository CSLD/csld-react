import fetch from 'isomorphic-unfetch'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/react-hooks'
import withApollo from 'next-with-apollo'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

const simpleMerge = { merge: (existing: any, incoming: any) => ({ ...existing, ...incoming }) }
const overwriteMerge = { merge: (existing: any, incoming: any) => incoming }

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
        link: createHttpLink({
            uri,
            credentials: 'same-origin',
        }),
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
