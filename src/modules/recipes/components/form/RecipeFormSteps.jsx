import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Input from '@/components/Input';
import RecipeSection from '@/modules/recipes/components/RecipeSection';

const RecipeFormSteps = ({ control, register }) => {
  const {
    append: appendStep,
    fields: editSteps,
    remove: removeStep,
  } = useFieldArray({
    control,
    keyName: '_id',
    name: 'steps',
  });

  const handleAppendStep = () => appendStep({ instruction: '' });

  const handleRemoveStep = (index) => removeStep(index);

  return (
    <RecipeSection label="przygotowanie">
      {editSteps.length > 0 && (
        <ul className="space-y-4">
          {editSteps.map((step, index) => (
            <li className="flex items-end gap-4" key={step._id}>
              <Input
                defaultValue={step.instruction}
                fullWidth
                label={`Krok ${index + 1}`}
                multiline
                name={`steps.${index}.instruction`}
                placeholder="Opis kroku..."
                register={register}
                required
              />
              <Button icon="delete" onClick={() => handleRemoveStep(index)} />
            </li>
          ))}
        </ul>
      )}
      <Button fullWidth icon="add" onClick={handleAppendStep} />
    </RecipeSection>
  );
};

RecipeFormSteps.propTypes = {
  control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  register: PropTypes.func.isRequired,
};

export default RecipeFormSteps;
