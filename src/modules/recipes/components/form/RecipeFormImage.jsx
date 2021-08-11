import { useRouter } from 'next/router';
import { useState } from 'react';
import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';

const RecipeFormImage = ({ recipeId }) => {
  const { push } = useRouter();

  const [selectedImage, setSelectedImage] = useState();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate(recipeId);

  const handleFileSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    const updatedRecipe = await updateRecipeImage(formData);

    if (updatedRecipe) {
      push(`/recipes/${recipeId}`);
    }
  };

  return (
    <RecipeSection label="zdjęcie">
      <div className="flex items-center justify-between">
        {statusRecipeImageUpdate === 'idle' && (
          <>
            <input onChange={handleFileSelect} accept="image/*" type="file" />
            <button className="button" onClick={handleImageUpload} type="button">
              Wyślij
            </button>
          </>
        )}
        {statusRecipeImageUpdate === 'loading' && (
          <div>
            <p>The image is being set...</p>
            <p>Please wait...</p>
          </div>
        )}
      </div>
    </RecipeSection>
  );
};

RecipeFormImage.propTypes = {
  recipeId: PropTypes.string.isRequired,
};

export default RecipeFormImage;
