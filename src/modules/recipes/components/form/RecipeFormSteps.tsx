import { useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@/components/Button';
import RecipeSection from '@/modules/recipes/components/RecipeSection';
import TextArea from '@/components/TextArea';

interface IRecipeFormStep {
  handleRemoveStep: () => void;
  index: number;
}

const RecipeFormStep = ({
  handleRemoveStep,
  index,
}: IRecipeFormStep): JSX.Element => {
  const { register } = useFormContext();

  return (
    <li className="flex items-end gap-4">
      <TextArea
        fullWidth
        label={`Krok ${index + 1}`}
        placeholder="Opis kroku..."
        required
        {...register(`steps.${index}.instruction`)}
      />
      <Button icon="delete" onClick={handleRemoveStep} />
    </li>
  );
};

const RecipeFormSteps = (): JSX.Element => {
  const { control } = useFormContext();

  const {
    append: appendStep,
    fields: editSteps,
    remove: removeStep,
  } = useFieldArray({
    control,
    keyName: '_id',
    name: 'steps',
  });

  const handleAppendStep = (): void => appendStep({ instruction: '' });

  const handleRemoveStep = (index: number): void => removeStep(index);

  return (
    <RecipeSection label="przygotowanie">
      {editSteps.length > 0 && (
        <ul className="space-y-4">
          {editSteps.map((step, index) => (
            <RecipeFormStep
              handleRemoveStep={(): void => handleRemoveStep(index)}
              index={index}
              key={step._id}
            />
          ))}
        </ul>
      )}
      <Button fullWidth icon="add" onClick={handleAppendStep} />
    </RecipeSection>
  );
};

export default RecipeFormSteps;
