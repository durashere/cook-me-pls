import { useSession } from 'next-auth/client';
import ErrorPage from 'next/error';

import Loader from '@/components/Loader';

const Protect = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null => {
  const [session, loading] = useSession();

  if (!loading && !session) {
    return (
      <ErrorPage statusCode={403} title="Nie masz dostępu do tej strony" />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!loading && session) {
    return <>{children}</>;
  }

  return null;
};

export default Protect;
