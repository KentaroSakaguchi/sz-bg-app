import Document, { Html, Head, Main, NextScript } from 'next/document'
import "scroll-behavior-polyfill";
import { css, jsx } from '@emotion/react';

class MyApp extends Document {
  render() {
    return (
      <Html lang="ja" className="text-gray-900 leading-tight" css={css` scroll-behavior: smooth;`} scroll-behavior="smooth">
        <Head>
        </Head>
        <body className="min-h-screen bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyApp
