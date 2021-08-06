import PropTypes from 'prop-types';

import { COOK_TIMES, DIFFICULTIES } from '@/app/constants';
import Input from '@/components/Input';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import Select from '@/components/Select';

const RecipeFormDetails = ({ register }) => {
  return (
    <RecipeSection label="details">
      <Input fullWidth label="Name" name="name" register={register} required />
      <Select
        fullWidth
        label="Difficulty"
        name="difficulty"
        options={DIFFICULTIES}
        register={register}
        required
      />
      <Select
        fullWidth
        label="Cook time"
        name="cookTime"
        options={COOK_TIMES}
        register={register}
        required
      />
    </RecipeSection>
  );
};

RecipeFormDetails.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RecipeFormDetails;
