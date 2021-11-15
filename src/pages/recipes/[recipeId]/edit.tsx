import { dehydrate, QueryClient } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Button from '@/components/Button';
import dbConnect from '@/backend/dbConnect';
import Loader from '@/components/Loader';
import Recipe, { IRecipe } from '@/backend/models/recipe';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormImage from '@/modules/recipes/components/form/RecipeFormImage';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useRecipeImageUpdate from '@/modules/recipes/hooks/useRecipeImageUpdate';
import useRecipeUpdate from '@/modules/recipes/hooks/useRecipeUpdate';

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
}: IRecipeEditPage): JSX.Element => {
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
                <span className="material-icons-outlined">save</span>
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

  const fetchRecipe = async (): Promise<IRecipe> => {
    await dbConnect();
    const recipe = await Recipe.findById(params?.recipeId).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(recipe));
  };

  await queryClient.prefetchQuery(['recipes', params?.recipeId], () =>
    fetchRecipe()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetchRecipes = async (): Promise<IRecipe[]> => {
    await dbConnect();
    const recipes = await Recipe.find({}).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(recipes));
  };

  const recipes = await fetchRecipes();

  const paths = recipes.map((recipe) => ({
    params: { recipeId: recipe._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

RecipeEditPage.protect = true;

export default RecipeEditPage;
