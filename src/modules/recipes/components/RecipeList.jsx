import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

const Recipe = ({ author, cookTime, difficulty, imageUrl, name, recipeId }) => {
  return (
    <Link href={`/recipes/${recipeId}`}>
      <li className="p-4 space-y-4 overflow-hidden bg-white rounded-md shadow cursor-pointer">
        <div className="relative -mx-4 -mt-4 aspect-w-16 aspect-h-9">
          <Image src={imageUrl} layout="fill" objectFit="cover" alt="Picture of the dish" />
          <div className="from-transparent via-transparent to-white bg-gradient-to-b" />
        </div>
        <div className="flex justify-between gap-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="relative w-8 h-8 p-4 overflow-hidden rounded-md">
            <Image src={author.image} layout="fill" objectFit="cover" alt="User avatar" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 whitespace-nowrap">
            <h2 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow">
              {cookTime}
            </h2>
            <h2 className="px-2 text-yellow-500 border border-yellow-500 rounded-md shadow">
              {difficulty}
            </h2>
          </div>
        </div>
      </li>
    </Link>
  );
};

Recipe.defaultProps = { imageUrl: 'https://via.placeholder.com/640x427?text=Image' };

Recipe.propTypes = {
  author: PropTypes.shape({ image: PropTypes.string, name: PropTypes.string }).isRequired,
  cookTime: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

const RecipeList = ({ searchQuery }) => {
  const { value: searchQueryDebounced } = useDebounce(searchQuery, 500);

  const { data: recipes, status: statusRecipes } = useRecipes(searchQueryDebounced);

  if (statusRecipes === 'idle' || statusRecipes === 'loading') {
    return <Loader />;
  }

  if (statusRecipes === 'success' && !recipes.length) {
    return (
      <div className="p-4 mt-4 text-center bg-white rounded-md shadow-sm">Nic nie znaleziono</div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {recipes.map((recipe) => (
        <Recipe
          author={recipe.author}
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
