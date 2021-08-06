import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => {
  return (
    <li className="flex items-center gap-2">
      <div className="w-2 h-2 p-1 mx-2 bg-yellow-500 rounded-full" />
      <span className="font-medium text-gray-600">
        {`${ingredient.quantity} ${ingredient.unit} `}
        <span className="text-gray-500">{ingredient.name}</span>
      </span>
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
    <ul className="flex flex-col gap-4">
      {ingredients.map((ingredient) => (
        <Ingredient ingredient={ingredient} key={ingredient._id} />
      ))}
    </ul>
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
