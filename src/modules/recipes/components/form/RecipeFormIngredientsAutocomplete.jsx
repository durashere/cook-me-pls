import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { UNITS } from '@/app/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Select from '@/components/Select';
import useDebounce from '@/hooks/useDebounce';
import useIngredientCreate from '@/modules/ingredients/hooks/useIngredientCreate';
import useIngredients from '@/modules/ingredients/hooks/useIngredients';

const RecipeFormIngredientsAutocomplete = ({ appendIngredient, usedIngredients }) => {
  const defaultTempIngredient = { quantity: '', unit: '' };

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempIngredient, setTempIngredient] = useState(defaultTempIngredient);

  const searchInputRef = useRef(null);

  const { value: searchQueryDebouncedValue, loading: searchQueryDebouncedLoading } = useDebounce(
    searchQuery,
    500
  );

  const { data: ingredients, status: statusIngredients } =
    useIngredients(searchQueryDebouncedValue);

  const { mutateAsync: createIngredient } = useIngredientCreate();

  const unusedIngredients = ingredients?.filter(
    (ingredient) =>
      !usedIngredients.map((usedIngredient) => usedIngredient.name).includes(ingredient.name)
  );

  const handleAppendIngredient = (ingredient) => {
    appendIngredient(ingredient);
    setSearchQuery('');
    setSearchOpen(false);
  };

  const handleCreateIngredient = async () => {
    if (tempIngredient.quantity === '') return;
    if (tempIngredient.unit === '') return;
    const newIngredient = await createIngredient({ ...tempIngredient, name: searchQuery });
    setSearchQuery('');
    setTempIngredient(defaultTempIngredient);
    appendIngredient(newIngredient);
    setSearchOpen(false);
  };

  const handleToggleSearchOpen = () => setSearchOpen(!searchOpen);

  return (
    <>
      <div className="relative flex gap-4">
        <Input
          fullWidth
          onClick={handleToggleSearchOpen}
          placeholder="Szukaj składnika..."
          readOnly
          value={searchQuery}
        />
        <span className="absolute right-0 w-10 h-10 p-2 text-gray-300 pointer-events-none material-icons-outlined">
          search
        </span>
      </div>

      <Dialog
        className="fixed inset-0 z-10 max-w-2xl mx-auto bg-white"
        initialFocus={searchInputRef}
        onClose={handleToggleSearchOpen}
        open={searchOpen}
      >
        <div className="relative flex gap-4 p-4">
          <Button icon="chevron_left" onClick={handleToggleSearchOpen} />
          <Input
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj składnika..."
            ref={searchInputRef}
            type="search"
            value={searchQuery}
          />
        </div>

        {(searchQueryDebouncedLoading && searchQuery.length > 0 && <Loader />) ||
          (statusIngredients === 'loading' && <Loader />)}

        {statusIngredients === 'success' && searchQuery.length > 0 && !searchQueryDebouncedLoading && (
          <>
            {unusedIngredients?.length > 0 && (
              <>
                <p className="px-4 pt-4 font-medium text-center">
                  Wybierz składnik poniżej, aby go dodać.
                </p>
                <ul className="p-4 space-y-4 overflow-y-auto">
                  {unusedIngredients?.map((ingredient) => (
                    <li key={ingredient._id}>
                      <Button fullWidth onClick={() => handleAppendIngredient(ingredient)}>
                        <span className="capitalize">{ingredient.name}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {!ingredients.find(
              (ingredient) => ingredient.name.toLowerCase() === searchQuery.toLowerCase()
            ) && (
              <>
                <p className="px-4 pt-4 font-medium text-center">
                  Nic nie znaleziono lub to czego szukasz nie znajduje sie na liście?
                </p>
                <p className="p-4 text-center text-gray-500">
                  Możesz utworzyć składnik
                  <span className="font-bold capitalize"> {searchQuery} </span>
                  podając poniżej domyślną ilość oraz jednostkę tak aby podczas kolejnego dodawania
                  pola te ustawiły sie automatycznie. Bez obaw, po dodaniu składnika zawsze możesz
                  zmienić te wartości.
                </p>
                <div className="flex gap-4 px-4 pb-4">
                  <Input
                    fullWidth
                    onChange={(e) =>
                      setTempIngredient({ ...tempIngredient, quantity: e.target.value })
                    }
                    placeholder="Ilość..."
                    type="number"
                    value={tempIngredient.quantity}
                  />
                  <Select
                    onChange={(e) => setTempIngredient({ ...tempIngredient, unit: e.target.value })}
                    options={UNITS}
                    placeholder="Jednostka..."
                    value={tempIngredient.unit}
                    required
                  />
                  <Button icon="add" onClick={handleCreateIngredient} />
                </div>
              </>
            )}
          </>
        )}
      </Dialog>
    </>
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
