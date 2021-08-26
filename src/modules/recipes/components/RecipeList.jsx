import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

const Recipe = ({ cookTime, difficulty, image, name, recipeId }) => {
  return (
    <Link href={`/recipes/${recipeId}`}>
      <li className="p-4 space-y-4 overflow-hidden bg-white rounded-md shadow-md cursor-pointer">
        <div className="relative -mx-4 -mt-4 aspect-w-16 aspect-h-9">
          <Image src={image} layout="fill" objectFit="cover" alt="Picture of the dish" />
          <div className="from-transparent via-transparent to-white bg-gradient-to-b" />
        </div>
        <h1 className="text-2xl font-bold text-center">{name}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 whitespace-nowrap">
          <h2 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow">
            {cookTime}
          </h2>
          <h2 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow">
            {difficulty}
          </h2>
        </div>
      </li>
    </Link>
  );
};

Recipe.defaultProps = { image: '/image-placeholder.png' };

Recipe.propTypes = {
  cookTime: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

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
        <Recipe
          cookTime={recipe.cookTime}
          difficulty={recipe.difficulty}
          image={recipe.image}
          key={recipe._id}
          name={recipe.name}
          recipeId={recipe._id}
        />
      ))}
    </ul>
  );
};

RecipeList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default RecipeList;
