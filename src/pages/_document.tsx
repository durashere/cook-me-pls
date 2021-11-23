import { ReactElement } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends NextDocument {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/chicken.svg" />
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
