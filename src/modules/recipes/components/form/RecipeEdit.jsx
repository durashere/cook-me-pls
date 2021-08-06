import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Loader from '@/components/Loader';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useRecipeUpdate from '@/modules/recipes/hooks/useRecipeUpdate';

const RecipeEdit = () => {
  const {
    push,
    query: { recipeId },
  } = useRouter();

  const { data: recipe, status: statusRecipe } = useRecipe(recipeId);

  const { mutate: updateRecipe } = useRecipeUpdate();

  const { register, control, handleSubmit, reset } = useForm({ defaultValues: recipe });

  useEffect(() => {
    reset(recipe);
  }, [reset, recipe]);

  const onSubmit = (data) => {
    updateRecipe({ _id: recipe._id, ...data });
    push(`/recipes/${recipe._id}`);
  };

  if (statusRecipe === 'idle' || statusRecipe === 'loading') {
    return <Loader />;
  }

  return (
    <form className="relative px-4 space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <RecipeFormDetails register={register} />

      <RecipeFormIngredients control={control} register={register} />

      <RecipeFormSteps control={control} register={register} />

      <div className="flex justify-between">
        <Link href={`/recipes/${recipe._id}`}>
          <a className="border-transparent shadow-none button">Cancel</a>
        </Link>
        <div className="flex gap-4">
          <input className="cursor-pointer button" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default RecipeEdit;
