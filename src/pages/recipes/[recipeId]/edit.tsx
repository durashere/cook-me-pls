import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import RecipeFormEdit from '@/modules/recipes/components/form/RecipeFormEdit';

const RecipeEditPage = (): JSX.Element => {
  const {
    query: { recipeId },
  } = useRouter();

  if (typeof recipeId !== 'string') {
    return <Loader />;
  }

  return <RecipeFormEdit recipeId={recipeId} />;
};

RecipeEditPage.protect = true;

export default RecipeEditPage;
