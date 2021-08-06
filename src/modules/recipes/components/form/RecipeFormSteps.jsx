import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

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
    <RecipeSection label="steps">
      {editSteps.length > 0 && (
        <ul className="space-y-4">
          {editSteps.map((step, index) => (
            <li className="flex gap-4" key={step._id}>
              <span className="icon">{index + 1}</span>
              <Input
                defaultValue={step.instruction}
                fullWidth
                name={`steps.${index}.instruction`}
                register={register}
                required
              />
              <button
                className="button material-icons-outlined"
                onClick={() => onStepRemove(index)}
                type="button"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="w-full button material-icons-outlined" onClick={onStepAdd} type="button">
        add
      </button>
    </RecipeSection>
  );
};

RecipeFormSteps.propTypes = {
  control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  register: PropTypes.func.isRequired,
};

export default RecipeFormSteps;
