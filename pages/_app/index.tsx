import * as React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'

import { appWithTranslation } from 'server/i18n'
import { ErrorBoundary } from 'src/components/common/ErrorBoundary/ErrorBoundary'
import { ApolloProvider } from '@apollo/react-hooks'
import { config } from '@fortawesome/fontawesome-svg-core'
import { WithApolloProps } from 'next-with-apollo'
import UserContextProvider from 'src/components/common/UserContext/UserContextProvider'
import { Router } from 'next/router'
import { withApolloWrapper } from '../../src/with/withApolloProvider'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

// Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

class WebApp extends App<AppInitialProps & WithApolloProps<any>> {
    static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

        return { pageProps }
    }

    componentDidMount() {
        Router.events.on('routeChangeComplete', () => {
            // Reset window scroll on route change (= when we went to another page)
            window.scroll({
                top: 0,
                left: 0,
            })
        })
    }

    render() {
        const { Component, pageProps, apollo } = this.props

        return (
            <ErrorBoundary>
                <ApolloProvider client={apollo}>
                    <UserContextProvider>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <Component {...pageProps} />
                    </UserContextProvider>
                </ApolloProvider>
            </ErrorBoundary>
        )
    }
}

export default appWithTranslation(withApolloWrapper(WebApp))
