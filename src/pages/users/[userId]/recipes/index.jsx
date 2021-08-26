import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Loader from '@/components/Loader';
import UserRecipes from '@/modules/users/components/UserRecipes';
import withProtect from '@/components/withProtect';

const UserRecipesPage = () => {
  const [session] = useSession();
  const {
    push,
    query: { userId },
  } = useRouter();

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

export default withProtect(UserRecipesPage);
