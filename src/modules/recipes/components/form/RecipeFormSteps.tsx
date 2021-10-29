import { useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@/components/Button';
import RecipeFormSection from '@/modules/recipes/components/RecipeFormSection';
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
    <li className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
      <div className="flex justify-between gap-2">
        <span>Krok {index + 1}</span>
        <Button icon="delete" onClick={handleRemoveStep} />
      </div>
      <TextArea
        fullWidth
        placeholder="Opis kroku..."
        required
        {...register(`steps.${index}.instruction`)}
      />
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
    <RecipeFormSection label="przygotowanie">
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
      <div className="bg-white shadow-md">
        <Button fullWidth icon="add" onClick={handleAppendStep} />
      </div>
    </RecipeFormSection>
  );
};

export default RecipeFormSteps;
