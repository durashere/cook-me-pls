import { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import { TIMES, DIFFICULTIES } from '@/app/constants';
import Input from '@/components/Input';
import RecipeFormSection from '@/modules/recipes/components/RecipeFormSection';
import Select from '@/components/Select';

const RecipeFormDetails = (): ReactElement => {
  const { register } = useFormContext();

  return (
    <RecipeFormSection label="sczegóły">
      <Input
        fullWidth
        placeholder="Nazwa przepisu..."
        required
        {...register('name')}
      />
      <Select
        fullWidth
        options={TIMES}
        placeholder="Czas..."
        required
        {...register('cookTime')}
      />
      <Input
        fullWidth
        placeholder="Ilość porcji..."
        required
        type="number"
        {...register('servings')}
      />
      <Select
        fullWidth
        options={DIFFICULTIES}
        placeholder="Trudność przepisu..."
        required
        {...register('difficulty')}
      />
    </RecipeFormSection>
  );
};

export default RecipeFormDetails;
