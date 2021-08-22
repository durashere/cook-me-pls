import Image from 'next/image';
import PropTypes from 'prop-types';

const RecipeAuthor = ({ image, name }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="relative w-6 h-6 overflow-hidden rounded-md">
        <Image src={image} layout="fill" objectFit="cover" alt="User avatar" />
      </div>
      <p className="text-lg">{name}</p>
    </div>
  );
};

RecipeAuthor.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RecipeAuthor;
