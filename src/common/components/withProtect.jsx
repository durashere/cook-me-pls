import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const withProtect = (WrappedComponent) => {
  return (props) => {
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

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withProtect;
