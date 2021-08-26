import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import RecipeSection from '@/modules/recipes/components/RecipeSection';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';
import Loader from '@/components/Loader';

const RecipeFormImage = ({ recipeId }) => {
  const { push } = useRouter();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate(recipeId);

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const updatedRecipe = await updateRecipeImage(formData);

    if (updatedRecipe) {
      push(`/recipes/${recipeId}`);
    }
  };

  return (
    <RecipeSection label="zdjęcie">
      <div className="flex items-center justify-between">
        {statusRecipeImageUpdate === 'idle' && (
          <div className="w-full text-center">
            <div className="flex flex-col">
              <span className="rotate-90 material-icons-outlined">smartphone</span>
              <span className="font-medium">Dodaj zdjęcie w pozycji horyzontalnej</span>
            </div>
            <input
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="self-center w-full p-4 mt-4 rounded-md ring-1 ring-gray-300"
              accept="image/*"
              type="file"
            />
          </div>
        )}
        {statusRecipeImageUpdate !== 'idle' && (
          <div className="w-full">
            <div className="relative p-10">
              <Loader />
            </div>
            <div className="font-medium text-center">To może chwilę potrwać...</div>
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
