import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

const Recipe = ({ recipeId, cookTime, difficulty, imageUrl, name }) => {
  return (
    <Link href={`/recipes/${recipeId}`}>
      <li className="overflow-hidden bg-white rounded-md shadow-sm cursor-pointer">
        <div className="relative pb-2/3">
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            alt="Picture of the dish"
            unoptimized
          />
        </div>
        <div className="p-4 space-y-4">
          <h2 className="h-full text-2xl font-medium line-clamp-3">{name}</h2>
          <div className="flex gap-2 whitespace-nowrap">
            <h3 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow-sm">
              {cookTime}
            </h3>
            <h3 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow-sm">
              {difficulty}
            </h3>
          </div>
        </div>
      </li>
    </Link>
  );
};

Recipe.defaultProps = { imageUrl: 'https://via.placeholder.com/640x427?text=Image' };

Recipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
  cookTime: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const RecipeList = ({ searchQuery }) => {
  const { value: searchQueryDebounced } = useDebounce(searchQuery, 500);

  const { data: recipes, status: statusRecipes } = useRecipes(searchQueryDebounced);

  if (statusRecipes === 'idle' || statusRecipes === 'loading') {
    return <Loader />;
  }

  if (statusRecipes === 'success' && !recipes.length) {
    return <div className="p-4 mt-4 text-center bg-white rounded-md shadow-sm">Nothing found</div>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <Recipe
          cookTime={recipe.cookTime}
          difficulty={recipe.difficulty}
          imageUrl={recipe.imageUrl}
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
