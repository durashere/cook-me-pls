import { useFieldArray, useFormContext } from 'react-hook-form';

import { IIngredient } from '@/backend/models/recipe';
import { UNITS } from '@/app/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import RecipeFormSection from '@/modules/recipes/components/RecipeFormSection';
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
    <li className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md">
      <Input
        defaultValue={ingredient.name}
        fullWidth
        placeholder="Nazwa..."
        required
        {...register(`ingredients.${index}.name`)}
      />
      <div className="flex gap-4">
        <Input
          defaultValue={ingredient.quantity}
          fullWidth
          placeholder="Ilość..."
          required
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

  const handleAppendIngredient = (): void => {
    appendIngredient({ name: '', quantity: '', unit: '' });
  };

  const handleRemoveIngredient = (index: number): void => {
    removeIngredient(index);
  };

  return (
    <RecipeFormSection label="składniki">
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
      <Button fullWidth onClick={handleAppendIngredient}>
        Dodaj składnik
      </Button>
    </RecipeFormSection>
  );
};

export default RecipeFormIngredients;
