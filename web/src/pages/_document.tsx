import React from 'react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

/* eslint-disable */
{
  /* <div className="hidden __react_component_tooltip place-left place-right place-top place-bottom">
  <div className="__react_component_tooltip place-left place-right place-top place-bottom"></div>
</div>; */
}
/* eslint-enable */

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
