import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import ErrorPage from 'next/error';

import { IRecipe } from '@/backend/models/recipe';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormImage from '@/modules/recipes/components/form/RecipeFormImage';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';
import useRecipeUpdate from '@/modules/recipes/hooks/useRecipeUpdate';

interface ISelectedImage {
  image: File | null;
  url: string | null;
}

const RecipeEditPage = (): JSX.Element => {
  const {
    back,
    query: { recipeId },
  } = useRouter();

  const [session, loading] = useSession();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId as string);

  const { mutateAsync: updateRecipe } = useRecipeUpdate();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate();

  const [selectedImage, setSelectedImage] = useState<ISelectedImage>({
    image: null,
    url: recipe?.image as string,
  });

  const methods = useForm({
    defaultValues: recipe,
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (recipe) {
      setSelectedImage({
        image: null,
        url: recipe.image,
      });
    }
    reset(recipe);
  }, [recipe, reset]);

  const handleCancel = (): void => {
    back();
  };

  const handleUpdateRecipe = async (data: IRecipe): Promise<void> => {
    await updateRecipe(data);

    if (selectedImage.image) {
      const updatedImageFormData = new FormData();
      updatedImageFormData.append('_id', recipe?._id as string);
      updatedImageFormData.append('image', selectedImage.image);

      await updateRecipeImage(updatedImageFormData);
    }

    back();
  };

  if (
    loading ||
    statusRecipe === 'loading' ||
    statusRecipeImageUpdate === 'loading'
  ) {
    return <Loader />;
  }

  if (!loading && session?.user._id !== recipe?.author._id) {
    return (
      <ErrorPage statusCode={403} title="Nie możesz edytować tego przepisu" />
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        className="relative space-y-8"
        onSubmit={handleSubmit(handleUpdateRecipe)}
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
            Zapisz
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

RecipeEditPage.protect = true;

export default RecipeEditPage;
