import PropTypes from 'prop-types';

import Loader from '@/components/Loader';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

const RecipeList = ({ searchQuery }) => {
  const { value: searchQueryDebounced, loading: searchQueryDebouncedLoading } = useDebounce(
    searchQuery,
    500
  );

  const { data: recipes, status: statusRecipes } = useRecipes(searchQueryDebounced);

  if (searchQueryDebouncedLoading || statusRecipes === 'idle' || statusRecipes === 'loading') {
    return <Loader />;
  }

  if (statusRecipes === 'success' && !recipes.length) {
    return <div className="p-4 text-center bg-white rounded-md shadow-md">Nic nie znaleziono</div>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
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

RecipeList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default RecipeList;
