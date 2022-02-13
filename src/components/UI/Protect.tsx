import { useSession } from 'next-auth/react';
import ErrorPage from 'next/error';
import { cloneElement, ReactElement } from 'react';

import Loader from '@/components/UI/Loader';

const Protect = ({ children }: { children: ReactElement }): ReactElement => {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <Loader />;
  }

  if (sessionStatus === 'unauthenticated') {
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
