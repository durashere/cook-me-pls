import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { NextPage } from 'next';
import { Provider } from 'next-auth/client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import Head from 'next/head';

import DefaultLayout from '@/layouts/default/components/DefaultLayout';

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
}: CustomAppProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Cook me pls</title>
      </Head>

      <Provider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default CustomApp;
