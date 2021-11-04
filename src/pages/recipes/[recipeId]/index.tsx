import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import RecipeDisplay from '@/modules/recipes/components/recipe/RecipeDisplay';

const RecipePage = (): JSX.Element => {
  const {
    query: { recipeId },
  } = useRouter();

  if (typeof recipeId !== 'string') {
    return <Loader />;
  }

  return <RecipeDisplay recipeId={recipeId} />;
};

export default RecipePage;
