import { useState } from 'react';
import PropTypes from 'prop-types';

import useDebounce from '@/hooks/useDebounce';
import useIngredients from '@/modules/ingredients/hooks/useIngredients';

const RecipeFormIngredientsAutocomplete = ({ append, editIngredients }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: ingredients, status: statusIngredients } = useIngredients(debouncedSearchQuery);

  const usedIngredients = editIngredients.map((ingredient) => ingredient._id);

  const unusedIngredients = ingredients?.filter(
    (ingredient) => !usedIngredients.includes(ingredient._id)
  );

  const appendIngredient = (ingredient) => {
    append(ingredient);
    setSearchQuery('');
  };

  return (
    <div className="relative group">
      <input
        className="w-full pr-12 input"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Szukaj składnika..."
        type="text"
        value={searchQuery}
      />
      <span className="absolute top-0 right-0 text-gray-300 pointer-events-none icon material-icons-outlined">
        search
      </span>
      {statusIngredients !== 'loading' && unusedIngredients && (
        <div className="absolute hidden w-full mt-1 overflow-y-auto bg-white ring-1 ring-gray-200 rounded-md max-h-[150px] group-focus-within:block">
          {unusedIngredients?.map((ingredient) => (
            <button
              className="flex items-center justify-between w-full pl-3 hover:bg-gray-200"
              key={ingredient._id}
              onClick={() => appendIngredient(ingredient)}
              type="button"
            >
              <span className="capitalize">{ingredient.name}</span>
              <span className="text-gray-400 icon material-icons-outlined">add</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

RecipeFormIngredientsAutocomplete.propTypes = {
  append: PropTypes.func.isRequired,
  editIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      unit: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeFormIngredientsAutocomplete;
