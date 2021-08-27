import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useUserRecipes from '@/modules/users/hooks/useUserRecipes';

const UserRecipes = () => {
  const {
    query: { userId },
  } = useRouter();

  const { data: userRecipes, status: userRecipesStatus } = useUserRecipes(userId);

  if (userRecipesStatus === 'idle' || userRecipesStatus === 'loading') {
    return <Loader />;
  }

  return (
    <div>
      <ul className="space-y-4">
        {userRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
