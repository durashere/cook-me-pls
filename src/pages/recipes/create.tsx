import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { IRecipe } from 'backend/models/recipe';
import RecipeFormDetails from 'components/Recipe/Form/Details';
import RecipeFormImage from 'components/Recipe/Form/Image';
import RecipeFormIngredients from 'components/Recipe/Form/Ingredients';
import RecipeFormSteps from 'components/Recipe/Form/Steps';
import Button from 'components/UI/Button';
import useRecipeCreate from 'hooks/recipes/useRecipeCreate';
import useRecipeImageUpdate from 'hooks/recipes/useRecipeImageUpdate';

interface ISelectedImage {
  image?: File;
  url?: string;
}

function RecipeCreatePage(): ReactElement {
  const [selectedImage, setSelectedImage] = useState<ISelectedImage>({
    image: undefined,
    url: undefined,
  });

  const { push } = useRouter();

  const { mutateAsync: createRecipe, status: statusRecipeCreate } =
    useRecipeCreate();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate();

  const methods = useForm<IRecipe>();
  const { handleSubmit } = methods;

  const handleCancel = async (): Promise<void> => {
    await push('/profile/my-recipes');
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
          <Button onClick={handleCancel} variant="ghost">
            Anuluj
          </Button>
          <Button
            type="submit"
            isLoading={
              statusRecipeCreate === 'loading' ||
              statusRecipeCreate === 'success' ||
              statusRecipeImageUpdate === 'loading' ||
              statusRecipeImageUpdate === 'success'
            }
            variant="solid"
          >
            Utwórz
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

RecipeCreatePage.protect = true;

export default RecipeCreatePage;
