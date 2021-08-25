import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Loader from '@/components/Loader';
import UserRecipes from '@/modules/users/components/UserRecipes';

const UserRecipesPage = () => {
  const [session, loading] = useSession();
  const {
    push,
    query: { userId },
  } = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (!loading && !session) {
    push('/');
    return <Loader />;
  }

  if (session.user._id !== userId) {
    push('/');
    return <Loader />;
  }

  return (
    <>
      <UserRecipes />
    </>
  );
};

export default UserRecipesPage;
