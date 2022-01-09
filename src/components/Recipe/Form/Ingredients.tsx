import { ReactElement } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { UNITS } from '@/app/constants';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import RecipeFormSection from '@/components/Recipe/Form/Section';
import Select from '@/components/UI/Select';

interface IRecipeFormIngredient {
  handleRemoveIngredient: () => void;
  index: number;
}

const RecipeFormIngredient = ({
  handleRemoveIngredient,
  index,
}: IRecipeFormIngredient): ReactElement => {
  const { register } = useFormContext();

  return (
    <li className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md">
      <Input
        fullWidth
        placeholder="Nazwa..."
        required
        {...register(`ingredients.${index}.name`)}
      />
      <div className="flex gap-4">
        <Input
          fullWidth
          placeholder="Ilość..."
          required
          type="number"
          {...register(`ingredients.${index}.quantity`)}
        />
        <Select
          options={UNITS}
          placeholder="Jednostka..."
          required
          {...register(`ingredients.${index}.unit`)}
        />
        <Button onClick={handleRemoveIngredient}>Usuń</Button>
      </div>
    </li>
  );
};

const RecipeFormIngredients = (): ReactElement => {
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
            />
          ))}
        </ul>
      )}
      <Button isFullWidth onClick={handleAppendIngredient}>
        Dodaj składnik
      </Button>
    </RecipeFormSection>
  );
};

export default RecipeFormIngredients;
