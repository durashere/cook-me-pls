import { useRouter } from 'next/router';
import Link from 'next/link';

import useRecipe from '@/modules/recipes/hooks/useRecipe';
import Loader from '@/components/Loader';
import RecipeSteps from '@/modules/recipes/components/recipe/RecipeSteps';
import RecipeIngredients from '@/modules/recipes/components/recipe/RecipeIngredients';
import RecipeHeader from '@/modules/recipes/components/recipe/RecipeHeader';
import RecipeSection from '@/modules/recipes/components/RecipeSection';

const Recipe = () => {
  const {
    query: { recipeId },
  } = useRouter();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
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

      <Link href={`/recipes/${recipeId}/edit`}>
        <a className="rounded-md material-icons-outlined button">edit</a>
      </Link>
    </div>
  );
};

export default Recipe;
