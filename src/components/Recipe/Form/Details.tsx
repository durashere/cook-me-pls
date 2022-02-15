import { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import { DIFFICULTIES, TIMES } from 'app/constants';
import RecipeFormSection from 'components/Recipe/Form/Section';
import Input from 'components/UI/Input';
import Select from 'components/UI/Select';

function RecipeFormDetails(): ReactElement {
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
}

export default RecipeFormDetails;
