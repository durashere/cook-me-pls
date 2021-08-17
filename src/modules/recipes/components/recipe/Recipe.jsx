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
        {!loading && session && (
          <Link href={`/recipes/${recipeId}/edit`}>
            <a className="button">Edytuj</a>
          </Link>
        )}

        <RecipeHeader
          cookTime={recipe.cookTime}
          difficulty={recipe.difficulty}
          imageUrl={recipe.imageUrl}
          name={recipe.name}
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
