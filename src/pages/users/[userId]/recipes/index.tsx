import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import UserRecipesHeader from '@/modules/users/components/UserRecipesHeader';
import UserRecipesList from '@/modules/users/components/UserRecipesList';

const UserRecipesPage = (): JSX.Element => {
  const {
    query: { userId },
  } = useRouter();

  if (typeof userId !== 'string') {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <UserRecipesHeader userId={userId} />
      <UserRecipesList userId={userId} />
    </div>
  );
};

export default UserRecipesPage;
