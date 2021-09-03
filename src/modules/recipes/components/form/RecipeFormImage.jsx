import { useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import RecipeSection from '@/modules/recipes/components/RecipeSection';

const RecipeFormImage = ({ selectedImage, setSelectedImage }) => {
  const imageUploadInputRef = useRef(null);

  const handleImageUploadButtonClick = () => {
    imageUploadInputRef.current.click();
  };

  const handleImageSelect = (image) => {
    const temporaryImageURL = URL.createObjectURL(image);
    setSelectedImage({ image, url: temporaryImageURL });
  };

  return (
    <RecipeSection label="zdjęcie">
      {selectedImage?.url && (
        <div className="relative overflow-hidden rounded-md aspect-w-1 aspect-h-1">
          <Image
            alt="recipe preview"
            layout="fill"
            objectFit="cover"
            src={selectedImage.url}
            unoptimized
          />
        </div>
      )}

      <div className="flex gap-4">
        <Button fullWidth onClick={handleImageUploadButtonClick}>
          Zmień zdjęcie
        </Button>
      </div>

      <input
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageSelect(e.target.files[0])}
        ref={imageUploadInputRef}
        type="file"
      />
    </RecipeSection>
  );
};

RecipeFormImage.propTypes = {
  selectedImage: PropTypes.shape({ url: PropTypes.string }).isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};

export default RecipeFormImage;
