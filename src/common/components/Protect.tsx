import { useSession } from 'next-auth/client';
import ErrorPage from 'next/error';
import { cloneElement } from 'react';

import Loader from '@/components/Loader';

const Protect = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) {
    return <Loader />;
  }

  if (!loading && !session) {
    return (
      <ErrorPage statusCode={403} title="Nie masz dostępu do tej strony" />
    );
  }

  const elementWithSession = cloneElement(children, {
    session,
  });

  return elementWithSession;
};

export default Protect;
