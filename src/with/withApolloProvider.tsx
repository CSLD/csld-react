import fetch from 'isomorphic-unfetch'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/react-hooks'
import withApollo from 'next-with-apollo'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
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
        link: createHttpLink({
            uri,
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache({
            typePolicies: {
                Mutation: {
                    fields: {
                        user: (existing, incoming) => ({ ...existing, incoming }),
                        game: (existing, incoming) => ({ ...existing, incoming }),
                        event: (existing, incoming) => ({ ...existing, incoming }),
                        admin: (existing, incoming) => ({ ...existing, incoming }),
                    },
                },
            },
        }).restore(initialState || {}),
    })
})
