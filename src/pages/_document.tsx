import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/chicken.svg" />
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
