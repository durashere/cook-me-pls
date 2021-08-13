import { useState } from 'react';
import PropTypes from 'prop-types';

import useDebounce from '@/hooks/useDebounce';
import useIngredients from '@/modules/ingredients/hooks/useIngredients';
import useIngredientCreate from '@/modules/ingredients/hooks/useIngredientCreate';
import Select from '@/components/Select';
import { UNITS } from '@/app/constants';
import Input from '@/components/Input';

const RecipeFormIngredientsAutocomplete = ({ appendIngredient, usedIngredients }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const defaultTempIngredient = { quantity: '1', unit: '' };

  const [tempIngredient, setTempIngredient] = useState(defaultTempIngredient);

  const { value: searchQueryDebounced, loading: searchQueryLoading } = useDebounce(
    searchQuery,
    500
  );

  const { data: ingredients, status: statusIngredients } = useIngredients(searchQueryDebounced);

  const { mutateAsync: createIngredient } = useIngredientCreate();

  const unusedIngredients = ingredients?.filter(
    (ingredient) =>
      !usedIngredients.map((usedIngredient) => usedIngredient.name).includes(ingredient.name)
  );

  const handleAppendIngredient = (ingredient) => {
    appendIngredient(ingredient);
    setSearchQuery('');
  };

  const handleCreateIngredient = async () => {
    if (tempIngredient.quantity === '') return;
    if (tempIngredient.unit === '') return;

    const newIngredient = await createIngredient({ ...tempIngredient, name: searchQuery });
    setSearchQuery('');
    setTempIngredient(defaultTempIngredient);
    appendIngredient(newIngredient);
  };

  return (
    <div className="relative flex flex-col gap-4 group">
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

      {statusIngredients !== 'idle' &&
        statusIngredients !== 'loading' &&
        !searchQueryLoading &&
        !unusedIngredients.find(
          (ingredient) => ingredient.name.toLowerCase() === searchQuery.toLowerCase()
        ) &&
        !ingredients.find(
          (ingredient) => ingredient.name.toLowerCase() === searchQuery.toLowerCase()
        ) && (
          <div className="absolute hidden w-full overflow-hidden bg-white rounded-md bottom-12 ring-1 ring-gray-400 group-focus-within:block">
            {statusIngredients === 'success' &&
              searchQuery !== '' &&
              !ingredients.find(
                (ingredient) => ingredient.name.toLowerCase() === searchQuery.toLowerCase()
              ) && (
                <div className="flex flex-col">
                  <span className="p-4 font-medium bg-gray-300">Utwórz nowy składnik:</span>
                  <div className="p-4 bg-gray-100">
                    <span className="capitalize">{searchQuery}</span>
                    <div className="flex gap-4 mt-1">
                      <Input
                        fullWidth
                        onChange={(e) =>
                          setTempIngredient({ ...tempIngredient, quantity: e.target.value })
                        }
                        placeholder="Ilość"
                        type="number"
                        value={tempIngredient.quantity}
                      />
                      <Select
                        onChange={(e) =>
                          setTempIngredient({ ...tempIngredient, unit: e.target.value })
                        }
                        options={UNITS}
                        placeholder="Jednostka"
                        value={tempIngredient.unit}
                      />
                      <button
                        className="material-icons-outlined button"
                        onClick={handleCreateIngredient}
                        type="button"
                      >
                        add
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {statusIngredients === 'success' && unusedIngredients?.length > 0 && (
              <div className="flex flex-col">
                <span className="p-4 font-medium bg-gray-300">Wybierz składnik z listy:</span>
                <ul className="p-4 space-y-2 overflow-y-auto bg-gray-100 max-h-44">
                  {unusedIngredients?.map((ingredient) => (
                    <li key={ingredient._id}>
                      <button
                        className="justify-between w-full p-0 px-4 rounded-none button"
                        onClick={() => handleAppendIngredient(ingredient)}
                        type="button"
                      >
                        <span className="capitalize">{ingredient.name}</span>
                        <span className="text-gray-400 icon material-icons-outlined">add</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

RecipeFormIngredientsAutocomplete.propTypes = {
  appendIngredient: PropTypes.func.isRequired,
  usedIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      unit: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeFormIngredientsAutocomplete;
