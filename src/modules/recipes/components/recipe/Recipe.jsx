import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

import Loader from '@/components/Loader';
import RecipeHeader from '@/modules/recipes/components/recipe/RecipeHeader';
import RecipeIngredients from '@/modules/recipes/components/recipe/RecipeIngredients';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import RecipeSteps from '@/modules/recipes/components/recipe/RecipeSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';

const Recipe = () => {
  const {
    query: { recipeId },
  } = useRouter();
  const [session, loading] = useSession();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <div className="space-y-8">
        {!loading && session?.user._id === recipe.author?._id && (
          <div className="p-2 text-center">
            <Link href={`/recipes/${recipeId}/edit`}>Edytuj</Link>
          </div>
        )}

        <RecipeHeader
          cookTime={recipe.cookTime}
          difficulty={recipe.difficulty}
          imageUrl={recipe.imageUrl}
          name={recipe.name}
          author={recipe.author}
        />

        <RecipeSection label="składniki">
          <RecipeIngredients ingredients={recipe.ingredients} />
        </RecipeSection>

        <RecipeSection label="przygotowanie">
          <RecipeSteps steps={recipe.steps} />
        </RecipeSection>
      </div>
    </>
  );
};

export default Recipe;
