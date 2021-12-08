import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { IconContext } from 'react-icons';
import { NextPage } from 'next';
import { ReactElement, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import DefaultLayout from '@/layouts/default/components/DefaultLayout';
import Protect from '@/components/Protect';

import '@/app/tailwind.css';

type CustomNextPage = NextPage & {
  protect?: boolean;
};

type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};

const CustomApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps): ReactElement => {
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
              <DefaultLayout>
                {Component.protect ? (
                  <Protect>
                    <Component {...pageProps} />
                  </Protect>
                ) : (
                  <Component {...pageProps} />
                )}
              </DefaultLayout>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </IconContext.Provider>
    </>
  );
};

export default CustomApp;
