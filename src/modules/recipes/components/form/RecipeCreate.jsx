import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipeCreate from '@/modules/recipes/hooks/useRecipeCreate';

const RecipeCreate = () => {
  const { back, push } = useRouter();

  const { mutateAsync: createRecipe } = useRecipeCreate();

  const { control, handleSubmit, register } = useForm();

  const handleCancel = (data) => {
    createRecipe(data);
    back();
  };

  const handleRecipeCreate = async (data) => {
    const createdRecipe = await createRecipe(data);
    push(`/recipes/${createdRecipe._id}`);
  };

  return (
    <form className="relative space-y-8" onSubmit={handleSubmit(handleRecipeCreate)}>
      <RecipeFormDetails register={register} />

      <RecipeFormIngredients control={control} register={register} />

      <RecipeFormSteps control={control} register={register} />

      <div className="flex justify-between">
        <Button onClick={handleCancel}>Anuluj</Button>
        <Button htmlType="submit" type="primary">
          Utwórz
        </Button>
      </div>
    </form>
  );
};

export default RecipeCreate;
