import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Loader from '@/components/Loader';
import RecipeEdit from '@/modules/recipes/components/form/RecipeEdit';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import withProtect from '@/components/withProtect';

const RecipeEditPage = () => {
  const {
    push,
    query: { recipeId },
  } = useRouter();

  const [session, loading] = useSession();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  if (loading || statusRecipe === 'loading') {
    return <Loader />;
  }

  if (!loading && session?.user._id !== recipe?.author._id) {
    push(`/recipes/${recipe._id}`);
    return <Loader />;
  }

  return (
    <>
      <RecipeEdit recipe={recipe} statusRecipe={statusRecipe} />
    </>
  );
};

export default withProtect(RecipeEditPage);
