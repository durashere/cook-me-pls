import { ReactElement } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import RecipeFormSection from '@/components/Recipe/Form/Section';
import Button from '@/components/UI/Button';
import TextArea from '@/components/UI/TextArea';

interface IRecipeFormStep {
  handleRemoveStep: () => void;
  index: number;
}

const RecipeFormStep = ({
  handleRemoveStep,
  index,
}: IRecipeFormStep): ReactElement => {
  const { register } = useFormContext();

  return (
    <li className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between gap-4">
        <span>Krok {index + 1}</span>
        <Button onClick={handleRemoveStep}>Usuń</Button>
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

const RecipeFormSteps = (): ReactElement => {
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
      <Button isFullWidth onClick={handleAppendStep}>
        Dodaj krok
      </Button>
    </RecipeFormSection>
  );
};

export default RecipeFormSteps;
