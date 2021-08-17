/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import PropTypes from 'prop-types';

import DefaultLayout from '@/layouts/default/components/DefaultLayout';

import '@/app/tailwind.css';

function CustomApp({ Component, pageProps }) {
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
}

CustomApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any),
};

CustomApp.defaultProps = {
  pageProps: {},
};

export default CustomApp;
