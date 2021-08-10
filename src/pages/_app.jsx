/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import DefaultLayout from '@/layouts/default/components/DefaultLayout';

import '@/app/tailwind.css';
import Head from 'next/head';

function CustomApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Cook me pls</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
