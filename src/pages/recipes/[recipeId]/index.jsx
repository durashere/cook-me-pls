import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import Recipe from '@/modules/recipes/components/recipe/Recipe';
import useRecipe from '@/modules/recipes/hooks/useRecipe';

const RecipePage = () => {
  const {
    query: { recipeId },
  } = useRouter();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <Recipe recipe={recipe} />
    </>
  );
};

export default RecipePage;
