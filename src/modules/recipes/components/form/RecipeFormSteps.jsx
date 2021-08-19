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

  const onStepAdd = () => appendStep({ instruction: '' });

  const onStepRemove = (index) => removeStep(index);

  return (
    <RecipeSection label="przygotowanie">
      {editSteps.length > 0 && (
        <ul className="space-y-4">
          {editSteps.map((step, index) => (
            <li className="flex gap-4" key={step._id}>
              <span className="icon">{index + 1}</span>
              <Input
                defaultValue={step.instruction}
                fullWidth
                name={`steps.${index}.instruction`}
                placeholder="Opis kroku..."
                register={register}
                required
              />
              <Button icon="delete" onClick={() => onStepRemove(index)} />
            </li>
          ))}
        </ul>
      )}
      <Button fullWidth icon="add" onClick={onStepAdd} />
    </RecipeSection>
  );
};

RecipeFormSteps.propTypes = {
  control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  register: PropTypes.func.isRequired,
};

export default RecipeFormSteps;
