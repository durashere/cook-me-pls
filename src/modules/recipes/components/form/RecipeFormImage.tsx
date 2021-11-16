import Image from 'next/image';
import React, { useRef } from 'react';

import Button from '@/components/Button';
import RecipeFormSection from '@/modules/recipes/components/RecipeFormSection';

interface ISelectedImage {
  image?: File;
  url?: string;
}

interface IRecipeFormImage {
  selectedImage: ISelectedImage;
  setSelectedImage: React.Dispatch<React.SetStateAction<ISelectedImage>>;
}

const RecipeFormImage = ({
  selectedImage,
  setSelectedImage,
}: IRecipeFormImage): JSX.Element => {
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
        <div className="relative overflow-hidden rounded-md aspect-w-1 aspect-h-1">
          <Image
            alt="Picture of the dish"
            layout="fill"
            objectFit="cover"
            priority
            src={selectedImage.url || '/image-placeholder.png'}
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
        onChange={(e): void => handleImageSelect(e)}
        ref={imageUploadInputRef}
        type="file"
      />
    </RecipeFormSection>
  );
};

export default RecipeFormImage;
