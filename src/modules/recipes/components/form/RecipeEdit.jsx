import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

import Button from '@/components/Button';
import Loader from '@/components/Loader';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormImage from '@/modules/recipes/components/form/RecipeFormImage';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useRecipeDelete from '@/modules/recipes/hooks/useRecipeDelete';
import useRecipeUpdate from '@/modules/recipes/hooks/useRecipeUpdate';

const RecipeEdit = () => {
  const {
    push,
    query: { recipeId },
  } = useRouter();
  const [session, loading] = useSession();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  const { mutate: updateRecipe } = useRecipeUpdate();

  const { mutate: deleteRecipe } = useRecipeDelete();

  const { register, control, handleSubmit, reset } = useForm({ defaultValues: recipe });

  useEffect(() => {
    reset(recipe);
  }, [reset, recipe]);

  const handleDelete = () => {
    deleteRecipe(recipe._id);
    push(`/`);
  };

  const handleUpdateRecipe = (data) => {
    updateRecipe({ _id: recipe._id, ...data });
    push(`/recipes/${recipe._id}`);
  };

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  if (!loading && session?.user._id !== recipe.author?._id) {
    push(`/recipes/${recipe._id}`);
    return <Loader />;
  }

  return (
    <form className="relative space-y-8" onSubmit={handleSubmit(handleUpdateRecipe)}>
      <RecipeFormImage recipeId={recipe._id} />

      <RecipeFormDetails register={register} />

      <RecipeFormIngredients control={control} register={register} />

      <RecipeFormSteps control={control} register={register} />

      <div className="flex justify-between">
        <Link href={`/recipes/${recipe._id}`}>
          <a className="p-2">Anuluj</a>
        </Link>
        <div className="flex gap-4">
          <Button onClick={handleDelete} type="danger">
            Usuń
          </Button>
          <Button htmlType="submit" type="primary">
            Zapisz
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RecipeEdit;
