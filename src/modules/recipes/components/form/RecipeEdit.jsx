import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Loader from '@/components/Loader';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormImage from '@/modules/recipes/components/form/RecipeFormImage';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';
import useRecipeUpdate from '@/modules/recipes/hooks/useRecipeUpdate';

const RecipeEdit = ({ recipe }) => {
  const [selectedImage, setSelectedImage] = useState({ image: null, url: recipe.image });

  const { back } = useRouter();

  const { mutateAsync: updateRecipe } = useRecipeUpdate(recipe._id);

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } = useRecipeImageUpdate(
    recipe._id
  );

  const { register, control, handleSubmit } = useForm({
    defaultValues: recipe,
  });

  const handleCancel = () => {
    back();
  };

  const handleUpdateRecipe = async (data) => {
    await updateRecipe(data);

    if (selectedImage.image) {
      const updatedImageFormData = new FormData();
      updatedImageFormData.append('image', selectedImage.image);

      await updateRecipeImage(updatedImageFormData);
    }

    back();
  };

  if (statusRecipeImageUpdate === 'loading') {
    return <Loader />;
  }

  return (
    <form className="relative space-y-8" onSubmit={handleSubmit(handleUpdateRecipe)}>
      <RecipeFormImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      <RecipeFormDetails register={register} />

      <RecipeFormIngredients control={control} register={register} />

      <RecipeFormSteps control={control} register={register} />

      <div className="flex justify-between">
        <Button onClick={handleCancel}>Anuluj</Button>
        <Button htmlType="submit" type="primary">
          Zapisz
        </Button>
      </div>
    </form>
  );
};

RecipeEdit.propTypes = {
  recipe: PropTypes.shape({ _id: PropTypes.string, image: PropTypes.string }).isRequired,
};

export default RecipeEdit;
