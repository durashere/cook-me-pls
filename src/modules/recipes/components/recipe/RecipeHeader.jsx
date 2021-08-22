import Image from 'next/image';
import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';

const RecipeHeader = ({ imageUrl, name }) => {
  return (
    <RecipeSection>
      <div className="relative -mx-4 -mt-4 overflow-hidden rounded-md aspect-w-16 aspect-h-9">
        <Image alt="Picture of the dish" layout="fill" objectFit="cover" src={imageUrl} />
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-600">{name}</h1>
    </RecipeSection>
  );
};

RecipeHeader.defaultProps = { imageUrl: 'https://via.placeholder.com/640x427?text=Image' };

RecipeHeader.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default RecipeHeader;
