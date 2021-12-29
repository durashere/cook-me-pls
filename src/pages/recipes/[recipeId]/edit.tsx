import { dehydrate, QueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MdOutlineSave } from 'react-icons/md';
import { ReactElement, useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import axios from 'axios';
import ErrorPage from 'next/error';

import { IRecipe } from '@/backend/models/recipe';
import Button from '@/components/UI/Button';
import Loader from '@/components/UI/Loader';
import RecipeFormDetails from '@/components/Recipe/Form/Details';
import RecipeFormImage from '@/components/Recipe/Form/Image';
import RecipeFormIngredients from '@/components/Recipe/Form/Ingredients';
import RecipeFormSteps from '@/components/Recipe/Form/Steps';
import useRecipe from '@/hooks/recipes/useRecipe';
import useRecipeImageUpdate from '@/hooks/recipes/useRecipeImageUpdate';
import useRecipeUpdate from '@/hooks/recipes/useRecipeUpdate';

interface ISelectedImage {
  image?: File;
  url?: string;
}

interface IRecipeEditPage {
  params: { recipeId: string };
  session: Session;
}

const RecipeEditPage = ({
  params: { recipeId },
  session,
}: IRecipeEditPage): ReactElement => {
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
          <Button onClick={handleCancel}>Anuluj</Button>
          <Button htmlType="submit" type="primary">
            <div className="flex items-center gap-2">
              <span className="font-medium">Zapisz</span>
              {statusRecipeUpdate === 'loading' ||
              statusRecipeUpdate === 'success' ||
              statusRecipeImageUpdate === 'loading' ||
              statusRecipeImageUpdate === 'success' ? (
                <Loader color="#F59E0B" className="w-6 h-6" />
              ) : (
                <MdOutlineSave />
              )}
            </div>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const getRecipe = async (): Promise<IRecipe> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IRecipe>(
      `${dev ? DEV_URL : PROD_URL}/api/recipes/${params?.recipeId}`
    );

    return res.data;
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
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IRecipe[]>(
      `${dev ? DEV_URL : PROD_URL}/api/recipes`
    );

    return res.data;
  };

  const recipes = await getRecipes();

  const paths = recipes.map((recipe) => ({
    params: { recipeId: recipe._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

RecipeEditPage.protect = true;

export default RecipeEditPage;
