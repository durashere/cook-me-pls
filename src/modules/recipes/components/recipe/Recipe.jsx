import PropTypes from 'prop-types';

import RecipeAuthor from '@/modules/recipes/components/recipe/RecipeAuthor';
import RecipeHeader from '@/modules/recipes/components/recipe/RecipeHeader';
import RecipeInfo from '@/modules/recipes/components/recipe/RecipeInfo';
import RecipeIngredients from '@/modules/recipes/components/recipe/RecipeIngredients';
import RecipeSteps from '@/modules/recipes/components/recipe/RecipeSteps';
import useServings from '@/modules/recipes/hooks/useServings';

const Recipe = ({ recipe }) => {
  const { servings, addServing, removeServing } = useServings({
    defaultServings: recipe.servings,
  });

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

      <RecipeIngredients ingredients={recipe.ingredients} servings={servings / recipe.servings} />

      <RecipeSteps steps={recipe.steps} />

      <RecipeAuthor _id={recipe.author._id} image={recipe.author.image} name={recipe.author.name} />
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
    }),
    cookTime: PropTypes.string,
    difficulty: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
      })
    ),
    name: PropTypes.string,
    servings: PropTypes.number,
    steps: PropTypes.arrayOf(
      PropTypes.shape({ _id: PropTypes.string, instruction: PropTypes.string })
    ),
  }).isRequired,
};

export default Recipe;
