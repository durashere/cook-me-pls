import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

interface Props {
  WrappedComponent: React.ReactNode;
}

const withProtect = (WrappedComponent) => (props) => {
  if (typeof window !== 'undefined') {
    const [session, loading] = useSession();
    const { push } = useRouter();

    if (loading) {
      return null;
    }

    if (!loading && !session) {
      push('/');
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  return null;
};

export default withProtect;
