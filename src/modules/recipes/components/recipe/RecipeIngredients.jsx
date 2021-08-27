import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

const Ingredient = ({ ingredient }) => {
  return (
    <li className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
      <span className="font-medium text-gray-600 first-letter:capitalize">{ingredient.name}</span>
      <span className="text-sm text-gray-500">{`${ingredient.quantity} ${ingredient.unit}`}</span>
    </li>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    unit: PropTypes.string,
  }).isRequired,
};

const RecipeIngredients = ({ ingredients }) => {
  return (
    <RecipeSection>
      <ul className="divide-y-2 divide-dotted">
        {ingredients.map((ingredient) => (
          <Ingredient ingredient={ingredient} key={ingredient._id} />
        ))}
      </ul>
    </RecipeSection>
  );
};

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      unit: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeIngredients;
