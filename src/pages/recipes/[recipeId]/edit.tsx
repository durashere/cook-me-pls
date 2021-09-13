import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import ErrorPage from 'next/error';

import Button from '@/components/Button';
import Loader from '@/components/Loader';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormImage from '@/modules/recipes/components/form/RecipeFormImage';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';
import useRecipeUpdate from '@/modules/recipes/hooks/useRecipeUpdate';
import withProtect from '@/components/withProtect';
import { IRecipe } from '@/backend/models/recipe';

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

  const [selectedImage, setSelectedImage] = useState({
    image: null,
    url: recipe?.image,
  });

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: recipe,
  });

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
      updatedImageFormData.append('image', selectedImage.image as File);

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
    <form
      className="relative space-y-8"
      onSubmit={handleSubmit(handleUpdateRecipe)}
    >
      <RecipeFormImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

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

export default withProtect(RecipeEditPage);
