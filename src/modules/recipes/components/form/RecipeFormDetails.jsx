import PropTypes from 'prop-types';

import { TIMES, DIFFICULTIES } from '@/app/constants';
import Input from '@/components/Input';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import Select from '@/components/Select';

const RecipeFormDetails = ({ register }) => {
  return (
    <RecipeSection label="sczegóły">
      <Input fullWidth name="name" placeholder="Nazwa przepisu..." register={register} required />
      <Select
        fullWidth
        name="difficulty"
        options={DIFFICULTIES}
        placeholder="Trudność przepisu..."
        register={register}
        required
      />
      <Select
        fullWidth
        name="cookTime"
        options={TIMES}
        placeholder="Czas..."
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
