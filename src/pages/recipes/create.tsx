import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { IRecipe } from '@/backend/models/recipe';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormImage from '@/modules/recipes/components/form/RecipeFormImage';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipeCreate from '@/modules/recipes/hooks/useRecipeCreate';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';

interface ISelectedImage {
  image: File | null;
  url: string | null;
}

const RecipeCreatePage = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<ISelectedImage>({
    image: null,
    url: null,
  });

  const { back, push } = useRouter();

  const { mutateAsync: createRecipe, status: statusRecipeCreate } =
    useRecipeCreate();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate();

  const methods = useForm();
  const { handleSubmit } = methods;

  const handleCancel = (): void => {
    back();
  };

  const handleRecipeCreate = async (data: IRecipe): Promise<void> => {
    const createdRecipe = await createRecipe(data);

    if (selectedImage.image) {
      const updatedImageFormData = new FormData();
      updatedImageFormData.append('_id', createdRecipe._id);
      updatedImageFormData.append('image', selectedImage.image);

      await updateRecipeImage(updatedImageFormData);
    }

    await push(`/recipes/${createdRecipe._id}`);
  };

  if (
    statusRecipeCreate === 'loading' ||
    statusRecipeImageUpdate === 'loading'
  ) {
    return <Loader />;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="relative space-y-8"
        onSubmit={handleSubmit(handleRecipeCreate)}
      >
        <RecipeFormImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <RecipeFormDetails />

        <RecipeFormIngredients />

        <RecipeFormSteps />

        <div className="flex justify-between">
          <Button onClick={handleCancel}>Anuluj</Button>
          <Button htmlType="submit" type="primary">
            Utwórz
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

RecipeCreatePage.protect = true;

export default RecipeCreatePage;
