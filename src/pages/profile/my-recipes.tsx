import { useSession } from 'next-auth/client';

import MyRecipesList from '@/modules/profile/components/MyRecipes';
import Loader from '@/components/Loader';

const MyRecipesPage = (): JSX.Element => {
  const [session] = useSession();

  if (!session) {
    return <Loader />;
  }

  return <MyRecipesList userId={session.user._id} />;
};

MyRecipesPage.protect = true;

export default MyRecipesPage;
