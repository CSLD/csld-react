import * as React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { darkTheme } from '../../src/theme/darkTheme'

const style = `
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,latin-ext,cyrillic-ext,cyrillic);

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
    static async getInitialProps({ renderPage }: DocumentContext) {
        /**
         * Decorate first render with SheetsRegistry and then put generated CSS into output
         */
        const sheets = new SheetsRegistry()

        const decoratePage = (Page: any) => (props: any) => (
            <JssProvider registry={sheets}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Page {...props} />
            </JssProvider>
        )

        const renderedPage = renderPage(decoratePage)

        // eslint-disable-next-line react/no-danger
        const styles = <style type="text/css" id="jss-ssr" dangerouslySetInnerHTML={{ __html: sheets.toString() }} />

        const props = {
            ...renderedPage,
            styles,
        }
        return props
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
                    <style type="text/css">{style}</style>
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
