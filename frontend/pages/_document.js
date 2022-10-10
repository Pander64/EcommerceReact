import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

 class MyDocument extends Document {
    render() {
        return (
            <Html lang="en-CA">
                <Head />
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}


export default MyDocument