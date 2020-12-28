import * as React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss'
import { darkTheme } from '../../src/theme/darkTheme'

const globalStyle = `
    body {
      margin: 0;
      font-family: Open Sans, sans-serif;
      font-size: 16px;
      background-color: ${darkTheme.backgroundLight};
      box-sizing: border-box;
    }
    
    a {
      text-decoration: none;
      color: unset;
    }
    
    a:hover {
      text-decoration: none;
      color: unset;
    }
    `

class WebAppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        /**
         * Decorate first render with SheetsRegistry and then put generated CSS into output
         */
        const registry = new SheetsRegistry()
        const generateId = createGenerateId()
        const originalRenderPage = ctx.renderPage
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => (
                    <JssProvider registry={registry} generateId={generateId}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <App {...props} />
                    </JssProvider>
                ),
            })

        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style id="server-side-styles">{registry.toString()}</style>
                </>
            ),
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                        crossOrigin="anonymous"
                    />
                    <style type="text/css">{globalStyle}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default WebAppDocument
