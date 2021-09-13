import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Loader from '@/components/Loader';
import RecipeAuthor from '@/modules/recipes/components/recipe/RecipeAuthor';
import RecipeHeader from '@/modules/recipes/components/recipe/RecipeHeader';
import RecipeInfo from '@/modules/recipes/components/recipe/RecipeInfo';
import RecipeIngredients from '@/modules/recipes/components/recipe/RecipeIngredients';
import RecipeSteps from '@/modules/recipes/components/recipe/RecipeSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useServings from '@/modules/recipes/hooks/useServings';

const RecipePage = (): JSX.Element => {
  const {
    query: { recipeId },
  } = useRouter();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId as string);

  const { servings, addServing, removeServing } = useServings({
    defaultServings: recipe?.servings as number,
  });

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  if (!recipe) {
    return <ErrorPage statusCode={404} title="Nie znaleziono przepisu" />;
  }

  return (
    <div className="space-y-4">
      <RecipeHeader image={recipe.image} name={recipe.name} />

      <div className="grid grid-flow-col gap-4">
        <RecipeInfo icon="schedule">{recipe.cookTime}</RecipeInfo>
        <RecipeInfo icon="people">
          <div className="flex justify-center w-full gap-4">
            <button
              className="outline-none focus:outline-none material-icons-outlined"
              onClick={removeServing}
              type="button"
            >
              chevron_left
            </button>
            <span className="flex justify-center w-4">{servings}</span>
            <button
              className="outline-none focus:outline-none material-icons-outlined"
              onClick={addServing}
              type="button"
            >
              chevron_right
            </button>
          </div>
        </RecipeInfo>
        <RecipeInfo icon="bar_chart">{recipe.difficulty}</RecipeInfo>
      </div>

      <RecipeIngredients
        ingredients={recipe.ingredients}
        servings={servings / recipe.servings}
      />

      <RecipeSteps steps={recipe.steps} />

      <RecipeAuthor
        _id={recipe.author._id}
        image={recipe.author.image}
        name={recipe.author.name}
      />
    </div>
  );
};

export default RecipePage;
