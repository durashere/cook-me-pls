import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

const Recipe = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe._id}`}>
      <li className="overflow-hidden bg-white rounded-md shadow-sm cursor-pointer">
        <div className="relative pb-2/3">
          <Image
            src="https://via.placeholder.com/640x480?text=Image"
            layout="fill"
            objectFit="cover"
            alt="Picture of the dish"
            unoptimized
          />
        </div>
        <div className="p-4 space-y-4">
          <h2 className="h-full text-2xl font-medium line-clamp-3">{recipe.name}</h2>
          <div className="flex gap-2 whitespace-nowrap">
            <h3 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow-sm">
              {recipe.cookTime}
            </h3>
            <h3 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow-sm">
              {recipe.difficulty}
            </h3>
          </div>
        </div>
      </li>
    </Link>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    cookTime: PropTypes.string,
    difficulty: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

const RecipeList = ({ searchQuery }) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: recipes, status: statusRecipes } = useRecipes(debouncedSearchQuery);

  if (statusRecipes === 'idle' || statusRecipes === 'loading') {
    return <Loader />;
  }

  if (!recipes.length) {
    return <div className="p-4 mt-4 text-center bg-white rounded-md shadow-sm">Nothing found</div>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <Recipe recipe={recipe} key={recipe._id} />
      ))}
    </ul>
  );
};

RecipeList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default RecipeList;
