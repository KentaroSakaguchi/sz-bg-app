import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyApp extends Document {
  render() {
    return (
      <Html lang="ja" className="text-gray-900 leading-tight">
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
