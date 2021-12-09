import { ReactElement } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends NextDocument {
  render(): ReactElement {
    return (
      <Html>
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
        <body className="text-gray-700 bg-gray-100 font-poppins">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
