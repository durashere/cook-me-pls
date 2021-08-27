import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

const RecipeAuthor = ({ author: { _id, image, name } }) => {
  return (
    <div className="flex items-center justify-center">
      <Link href={`/users/${_id}/recipes`}>
        <div className="flex items-center cursor-pointer">
          <div className="relative w-6 h-6 overflow-hidden rounded-md">
            <Image src={image} layout="fill" objectFit="cover" alt="User avatar" />
          </div>
          <p className="ml-2 text-lg">{name}</p>
          <span className="material-icons-outlined">chevron_right</span>
        </div>
      </Link>
    </div>
  );
};

RecipeAuthor.propTypes = {
  author: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default RecipeAuthor;
