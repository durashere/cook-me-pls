import { useFieldArray, useFormContext } from 'react-hook-form';

import { IIngredient } from '@/backend/models/ingredient';
import { INewIngredient } from '@/modules/ingredients/hooks/useIngredientCreate';
import { UNITS } from '@/app/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import RecipeFormIngredientsAutocomplete from '@/modules/recipes/components/form/RecipeFormIngredientsAutocomplete';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import Select from '@/components/Select';

interface IRecipeFormIngredient {
  handleRemoveIngredient: () => void;
  index: number;
  ingredient: IIngredient;
}

const RecipeFormIngredient = ({
  handleRemoveIngredient,
  index,
  ingredient,
}: IRecipeFormIngredient): JSX.Element => {
  const { register } = useFormContext();

  return (
    <li>
      <span className="first-letter:capitalize">{ingredient.name}</span>

      <div className="flex gap-4 mt-1">
        <Input
          defaultValue={ingredient.quantity}
          fullWidth
          placeholder="Ilość..."
          type="number"
          {...register(`ingredients.${index}.quantity`)}
        />
        <Select
          defaultValue={ingredient.unit}
          options={UNITS}
          placeholder="Jednostka..."
          required
          {...register(`ingredients.${index}.unit`)}
        />
        <Button icon="delete" onClick={handleRemoveIngredient} />
      </div>
    </li>
  );
};

const RecipeFormIngredients = (): JSX.Element => {
  const { control } = useFormContext();

  const {
    append: appendIngredient,
    fields: editIngredients,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    keyName: '_id',
    name: 'ingredients',
  });

  const handleAppendIngredient = (ingredient: INewIngredient): void => {
    appendIngredient(ingredient);
  };

  const handleRemoveIngredient = (index: number): void => {
    removeIngredient(index);
  };

  return (
    <RecipeSection label="składniki">
      {editIngredients.length > 0 && (
        <ul className="space-y-4">
          {editIngredients.map((ingredient, index) => (
            <RecipeFormIngredient
              key={ingredient._id}
              index={index}
              handleRemoveIngredient={(): void => handleRemoveIngredient(index)}
              ingredient={ingredient as IIngredient}
            />
          ))}
        </ul>
      )}
      <RecipeFormIngredientsAutocomplete
        handleAppendIngredient={handleAppendIngredient}
        usedIngredients={editIngredients as IIngredient[]}
      />
    </RecipeSection>
  );
};

export default RecipeFormIngredients;
