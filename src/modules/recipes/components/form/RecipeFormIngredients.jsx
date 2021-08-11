import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

import { UNITS } from '@/app/constants';
import Input from '@/components/Input';
import RecipeFormIngredientsAutocomplete from '@/modules/recipes/components/form/RecipeFormIngredientsAutocomplete';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import Select from '@/components/Select';

const RecipeFormIngredients = ({ control, register }) => {
  const {
    append: appendIngredient,
    fields: editIngredients,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    keyName: '_id',
    name: 'ingredients',
  });

  return (
    <RecipeSection label="składniki">
      {editIngredients.length > 0 && (
        <ul className="space-y-4">
          {editIngredients.map((ingredient, index) => (
            <li key={ingredient._id}>
              <span className="capitalize">{ingredient.name}</span>
              <div className="flex gap-4 mt-1">
                <Input
                  defaultValue={ingredient.quantity}
                  fullWidth
                  name={`ingredients.${index}.quantity`}
                  placeholder="Ilość..."
                  register={register}
                  type="number"
                />
                <Select
                  defaultValue={ingredient.unit}
                  name={`ingredients.${index}.unit`}
                  options={UNITS}
                  placeholder="Jednostka..."
                  register={register}
                  required
                />
                <button
                  className="button material-icons-outlined"
                  onClick={() => removeIngredient(index)}
                  type="button"
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <RecipeFormIngredientsAutocomplete
        append={appendIngredient}
        editIngredients={editIngredients}
      />
    </RecipeSection>
  );
};

RecipeFormIngredients.propTypes = {
  control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  register: PropTypes.func.isRequired,
};

export default RecipeFormIngredients;
