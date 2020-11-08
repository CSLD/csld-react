import * as React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { darkTheme } from '../../src/theme/darkTheme'

const style =
    'body {\n' +
    '  margin: 0;\n' +
    '  font-family: Open Sans, sans-serif;\n' +
    '  font-size: 16px;\n' +
    `  background-color: ${darkTheme.backgroundLight};\n` +
    '  box-sizing: border-box;\n' +
    '}\n' +
    '\n' +
    'a {\n' +
    '  text-decoration: none;\n' +
    '}\n'

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
