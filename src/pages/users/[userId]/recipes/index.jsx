import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import UserRecipes from '@/modules/users/components/UserRecipes';
import useUser from '@/modules/users/hooks/useUser';

const UserRecipesPage = () => {
  const {
    query: { userId },
  } = useRouter();

  const { data: user, status: userStatus } = useUser(userId);

  if (userStatus === 'loading') {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl text-center">
        Przepisy użytkownika <span className="block font-bold">{user.name}</span>
      </h1>
      <UserRecipes />
    </div>
  );
};

export default UserRecipesPage;
