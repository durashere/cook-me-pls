import RecipeSection from '@/modules/recipes/components/RecipeSection';
import { IIngredient } from '@/backend/models/ingredient';

type IRecipeIngredient = Omit<IIngredient, '_id'>;

const RecipeIngredient = ({
  name,
  quantity,
  unit,
}: IRecipeIngredient): JSX.Element => (
  <li className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
    <span className="font-medium text-gray-600 first-letter:capitalize">
      {name}
    </span>
    <span className="text-sm text-gray-500">{`${quantity} ${unit}`}</span>
  </li>
);

interface IRecipeIngredients {
  ingredients: IIngredient[];
  servings: number;
}

const RecipeIngredients = ({
  ingredients,
  servings,
}: IRecipeIngredients): JSX.Element => (
  <RecipeSection>
    <ul className="divide-y-2 divide-dotted">
      {ingredients.map((ingredient: IIngredient) => (
        <RecipeIngredient
          key={ingredient._id}
          name={ingredient.name}
          quantity={ingredient.quantity * servings}
          unit={ingredient.unit}
        />
      ))}
    </ul>
  </RecipeSection>
);

export default RecipeIngredients;
