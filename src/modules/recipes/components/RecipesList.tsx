import { IRecipe } from '@/backend/models/recipe';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';
import Loader from '@/components/Loader';

interface IRecipeList {
  searchQuery: string;
}

const RecipesList = ({ searchQuery }: IRecipeList): JSX.Element => {
  const { value: searchQueryDebounced } = useDebounce(searchQuery, 300);

  const { data: recipes, status: statusRecipes } =
    useRecipes(searchQueryDebounced);

  if (!recipes || statusRecipes === 'loading') {
    return <Loader />;
  }

  if (recipes.length === 0) {
    return (
      <div className="p-4 text-center bg-white rounded-md shadow-md">
        Nic nie znaleziono
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe: IRecipe) => (
        <RecipeCard
          _id={recipe._id}
          cookTime={recipe.cookTime}
          difficulty={recipe.difficulty}
          image={recipe.image}
          key={recipe._id}
          name={recipe.name}
          servings={recipe.servings}
        />
      ))}
    </ul>
  );
};

export default RecipesList;
