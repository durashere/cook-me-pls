import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import { AppProps } from 'next/app';

import DefaultLayout from '@/layouts/default/components/DefaultLayout';

import '@/app/tailwind.css';

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Cook me pls</title>
      </Head>

      <Provider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default CustomApp;
