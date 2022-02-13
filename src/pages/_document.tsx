import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

class CustomDocument extends NextDocument {
  render(): ReactElement {
    return (
      <Html lang="pl">
        <Head>
          <link rel="icon" href="/chicken.svg" />
          <link
            rel="preload"
            href="/fonts/lobster-v23-latin-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="font-poppins text-gray-700 bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
