import { IRecipe, IStep } from '@/backend/models/recipe';
import RecipeSection from '@/modules/recipes/components/RecipeSection';

interface IRecipeStepTemp extends IStep {
  index: number;
}

type IRecipeStep = Omit<IRecipeStepTemp, '_id'>;

const RecipeStep = ({ index, instruction }: IRecipeStep): JSX.Element => (
  <li>
    <p className="text-lg font-medium text-gray-600">Krok {index + 1}</p>
    <p className="p-4 my-4 ml-2 text-sm text-gray-500 border-l-2">
      {instruction}
    </p>
  </li>
);

const RecipeSteps = ({ steps }: IRecipe): JSX.Element => (
  <RecipeSection>
    <ul className="space-y-4">
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
