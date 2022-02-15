import Image from 'next/image';
import React, { ReactElement, useRef } from 'react';

import RecipeFormSection from 'components/Recipe/Form/Section';
import Button from 'components/UI/Button';

interface ISelectedImage {
  image?: File;
  url?: string;
}

interface IRecipeFormImage {
  selectedImage: ISelectedImage;
  setSelectedImage: React.Dispatch<React.SetStateAction<ISelectedImage>>;
}

function RecipeFormImage({
  selectedImage,
  setSelectedImage,
}: IRecipeFormImage): ReactElement {
  const imageUploadInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadButtonClick = (): void => {
    imageUploadInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const image = e.target.files?.[0];
    if (image) {
      const temporaryImageURL = URL.createObjectURL(image);
      setSelectedImage({ image, url: temporaryImageURL });
    }
  };

  return (
    <RecipeFormSection label="zdjęcie">
      {selectedImage.url && (
        <div className="aspect-square overflow-hidden relative rounded-md">
          <Image
            alt="Picture of the dish"
            layout="fill"
            objectFit="cover"
            priority
            src={selectedImage.url || '/image-placeholder.png'}
          />
        </div>
      )}

      <Button isFullWidth onClick={handleImageUploadButtonClick}>
        Zmień zdjęcie
      </Button>

      <input
        accept="image/*"
        className="hidden"
        onChange={(e): void => handleImageSelect(e)}
        ref={imageUploadInputRef}
        type="file"
      />
    </RecipeFormSection>
  );
}

export default RecipeFormImage;
