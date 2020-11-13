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
        // Server - get host from headers
        const host = props.headers?.host || ''
        const protocol = host.indexOf('localhost') >= 0 ? 'http://' : 'https://'
        uri = `${protocol}${host}/graphql`
    }

    return new ApolloClient({
        link: createHttpLink({
            uri,
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache().restore(initialState || {}),
    })
})
