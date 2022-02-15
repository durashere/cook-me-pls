import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import { IconContext } from 'react-icons';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Layout from 'components/Layout/Layout';
import Protect from 'components/UI/Protect';

import 'app/tailwind.css';

type CustomNextPage = NextPage & {
  protect?: boolean;
};

type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Cook me pls</title>
      </Head>

      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                {Component.protect ? (
                  <Protect>
                    <Component {...pageProps} />
                  </Protect>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </IconContext.Provider>
    </>
  );
}

export default CustomApp;
