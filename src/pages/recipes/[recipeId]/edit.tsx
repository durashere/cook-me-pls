import { GetStaticPaths, GetStaticProps } from 'next';
import { Session } from 'next-auth';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { dehydrate, QueryClient } from 'react-query';

import dbConnect from 'backend/dbConnect';
import Recipe, { IRecipe } from 'backend/models/recipe';
import RecipeFormDetails from 'components/Recipe/Form/Details';
import RecipeFormImage from 'components/Recipe/Form/Image';
import RecipeFormIngredients from 'components/Recipe/Form/Ingredients';
import RecipeFormSteps from 'components/Recipe/Form/Steps';
import Button from 'components/UI/Button';
import Loader from 'components/UI/Loader';
import useRecipe from 'hooks/recipes/useRecipe';
import useRecipeImageUpdate from 'hooks/recipes/useRecipeImageUpdate';
import useRecipeUpdate from 'hooks/recipes/useRecipeUpdate';

interface ISelectedImage {
  image?: File;
  url?: string;
}

interface IRecipeEditPage {
  params: { recipeId: string };
  session: Session;
}

function RecipeEditPage({
  params: { recipeId },
  session,
}: IRecipeEditPage): ReactElement {
  const { push } = useRouter();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  const { mutateAsync: updateRecipe, status: statusRecipeUpdate } =
    useRecipeUpdate();

  const { mutateAsync: updateRecipeImage, status: statusRecipeImageUpdate } =
    useRecipeImageUpdate();

  const [selectedImage, setSelectedImage] = useState<ISelectedImage>({
    image: undefined,
    url: recipe?.image,
  });

  const methods = useForm<IRecipe>({
    defaultValues: recipe,
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (recipe) {
      setSelectedImage({
        image: undefined,
        url: recipe.image,
      });
    }
    reset(recipe);
  }, [recipe, reset]);

  const handleCancel = async (): Promise<void> => {
    await push('/profile/my-recipes');
  };

  const handleUpdateRecipe = async (data: IRecipe): Promise<void> => {
    if (recipe) {
      await updateRecipe(data);

      if (selectedImage.image) {
        const updatedImageFormData = new FormData();
        updatedImageFormData.append('_id', recipe._id);
        updatedImageFormData.append('image', selectedImage.image);
        await updateRecipeImage(updatedImageFormData);
      }

      await push('/profile/my-recipes');
    }
  };

  if (statusRecipe === 'loading') {
    return <Loader />;
  }

  if (session?.user._id !== recipe?.author) {
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
          <Button onClick={handleCancel} variant="ghost">
            Anuluj
          </Button>
          <Button
            type="submit"
            isLoading={
              statusRecipeUpdate === 'loading' ||
              statusRecipeUpdate === 'success' ||
              statusRecipeImageUpdate === 'loading' ||
              statusRecipeImageUpdate === 'success'
            }
            variant="solid"
          >
            Zapisz
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const getRecipe = async (): Promise<IRecipe> => {
    await dbConnect();
    const recipe = await Recipe.findById(params?.recipeId);
    return JSON.parse(JSON.stringify(recipe));
  };

  await queryClient.prefetchQuery(
    ['recipes', 'detail', params?.recipeId],
    getRecipe
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getRecipes = async (): Promise<IRecipe[]> => {
    await dbConnect();
    const recipe = await Recipe.find({});
    return JSON.parse(JSON.stringify(recipe));
  };

  const recipes = await getRecipes();

  const paths = recipes.map((recipe) => ({
    params: { recipeId: recipe._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

RecipeEditPage.protect = true;

export default RecipeEditPage;
