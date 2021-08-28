import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

const Ingredient = ({ name, quantity, unit }) => {
  return (
    <li className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
      <span className="font-medium text-gray-600 first-letter:capitalize">{name}</span>
      <span className="text-sm text-gray-500">{`${quantity} ${unit}`}</span>
    </li>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

const RecipeIngredients = ({ ingredients, servings }) => {
  return (
    <RecipeSection>
      <ul className="divide-y-2 divide-dotted">
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            name={ingredient.name}
            quantity={ingredient.quantity * servings}
            unit={ingredient.unit}
          />
        ))}
      </ul>
    </RecipeSection>
  );
};

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  servings: PropTypes.number.isRequired,
};

export default RecipeIngredients;
