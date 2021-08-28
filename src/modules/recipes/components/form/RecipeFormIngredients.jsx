import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

import { UNITS } from '@/app/constants';
import Button from '@/components/Button';
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

  const handleRemoveIngredient = (index) => {
    removeIngredient(index);
  };

  return (
    <RecipeSection label="składniki">
      {editIngredients.length > 0 && (
        <ul className="space-y-4">
          {editIngredients.map((ingredient, index) => (
            <li key={ingredient._id}>
              <span className="first-letter:capitalize">{ingredient.name}</span>
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
                <Button icon="delete" onClick={() => handleRemoveIngredient(index)} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <RecipeFormIngredientsAutocomplete
        appendIngredient={appendIngredient}
        usedIngredients={editIngredients}
      />
    </RecipeSection>
  );
};

RecipeFormIngredients.propTypes = {
  control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  register: PropTypes.func.isRequired,
};

export default RecipeFormIngredients;
