import * as React from 'react'

import { DocumentContext } from 'next/document'
import fetch from 'isomorphic-unfetch'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/react-hooks'

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

// eslint-disable-next-line import/no-mutable-exports
export let apolloClient: ApolloClient<any>

export const createApolloClient = () => {
    if (!apolloClient) {
        apolloClient = new ApolloClient({
            link: createHttpLink({
                uri: 'http://localhost:3000/graphql',
                credentials: 'same-origin',
            }),
            cache: new InMemoryCache(),
        })
    }
    return apolloClient
}

export const withApolloProvider = (
    Page: React.ComponentClass & { getInitialProps?: (ctx: DocumentContext) => any },
): React.ComponentClass<any> => {
    return class extends React.PureComponent<any> {
        static async getInitialProps(ctx: any) {
            if (Page.getInitialProps) {
                return Page.getInitialProps(ctx)
            }
            return {}
        }

        render() {
            return (
                <ApolloProvider client={createApolloClient()}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Page {...this.props} />
                </ApolloProvider>
            )
        }
    }
}
