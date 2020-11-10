import * as React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'

import { appWithTranslation } from 'server/i18n'
import { ErrorBoundary } from 'src/components/common/ErrorBoundary/ErrorBoundary'
import { ApolloProvider } from '@apollo/react-hooks'
import { createApolloClient } from '../../src/with/withApolloProvider'

class WebApp extends App<AppInitialProps> {
    static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <ErrorBoundary>
                <ApolloProvider client={createApolloClient()}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Component {...pageProps} />
                </ApolloProvider>
            </ErrorBoundary>
        )
    }
}

export default appWithTranslation(WebApp)
