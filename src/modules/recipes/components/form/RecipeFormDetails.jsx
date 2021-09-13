import PropTypes from 'prop-types';

import { TIMES, DIFFICULTIES } from '@/app/constants';
import Input from '@/components/Input';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import Select from '@/components/Select';

const RecipeFormDetails = ({ register }) => {
  return (
    <RecipeSection label="sczegóły">
      <Input fullWidth placeholder="Nazwa przepisu..." required {...register('name')} />
      <Select fullWidth options={TIMES} placeholder="Czas..." required {...register('cookTime')} />
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
    </RecipeSection>
  );
};

RecipeFormDetails.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RecipeFormDetails;
