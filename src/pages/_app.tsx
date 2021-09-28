import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
}: CustomAppProps): JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Cook me pls</title>
      </Head>

      <Provider session={session}>
        <QueryClientProvider client={queryClient}>
          <DefaultLayout>
            {Component.protect ? (
              <Protect>
                <Component {...pageProps} />
              </Protect>
            ) : (
              <Component {...pageProps} />
            )}
          </DefaultLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default CustomApp;
