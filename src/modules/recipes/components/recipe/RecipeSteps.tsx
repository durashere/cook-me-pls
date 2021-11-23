import { ReactElement } from 'react';

import { IStep } from '@/backend/models/recipe';
import RecipeSection from '@/modules/recipes/components/RecipeSection';

type IRecipeStep = Pick<IStep, 'instruction'>;

interface IRecipeStepWithIndex extends IRecipeStep {
  index: number;
}

const RecipeStep = ({
  index,
  instruction,
}: IRecipeStepWithIndex): ReactElement => (
  <li>
    <p className="text-lg font-medium text-gray-600">Krok {index + 1}</p>
    <p className="px-4 py-2 m-2 text-sm text-gray-500 border-l-2">
      {instruction}
    </p>
  </li>
);

interface IRecipeSteps {
  steps: IStep[];
}

const RecipeSteps = ({ steps }: IRecipeSteps): ReactElement => (
  <RecipeSection>
    <ul className="space-y-8">
      {steps.map((step: IStep, index: number) => (
        <RecipeStep
          index={index}
          instruction={step.instruction}
          key={step._id}
        />
      ))}
    </ul>
  </RecipeSection>
);

export default RecipeSteps;
