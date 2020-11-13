import fetch from 'isomorphic-unfetch'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/react-hooks'
import withApollo from 'next-with-apollo'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

export const withApolloWrapper = withApollo(props => {
    const { initialState } = props
    return new ApolloClient({
        link: createHttpLink({
            uri: 'http://localhost:3000/graphql',
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache().restore(initialState || {}),
    })
})
