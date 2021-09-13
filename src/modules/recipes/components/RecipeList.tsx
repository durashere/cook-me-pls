import { IRecipe } from '@/backend/models/recipe';
import Loader from '@/components/Loader';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

interface IRecipeList {
  searchQuery: string;
}

const RecipeList = ({ searchQuery }: IRecipeList): JSX.Element => {
  const { value: searchQueryDebounced, loading: searchQueryDebouncedLoading } =
    useDebounce(searchQuery, 500);

  const { data: recipes, status: statusRecipes } =
    useRecipes(searchQueryDebounced);

  if (
    searchQueryDebouncedLoading ||
    statusRecipes === 'idle' ||
    statusRecipes === 'loading'
  ) {
    return <Loader />;
  }

  if (!recipes) {
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

export default RecipeList;
