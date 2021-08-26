import PropTypes from 'prop-types';

import Image from 'next/image';
import Link from 'next/link';

const RecipeCard = ({ cookTime, difficulty, image, name, recipeId }) => {
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

RecipeCard.defaultProps = { image: '/image-placeholder.png' };

RecipeCard.propTypes = {
  cookTime: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default RecipeCard;
