import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '@/components/Button';
import RecipeFormDetails from '@/modules/recipes/components/form/RecipeFormDetails';
import RecipeFormIngredients from '@/modules/recipes/components/form/RecipeFormIngredients';
import RecipeFormSteps from '@/modules/recipes/components/form/RecipeFormSteps';
import useRecipeCreate from '@/modules/recipes/hooks/useRecipeCreate';

const RecipeCreate = () => {
  const { push } = useRouter();

  const { mutate: createRecipe } = useRecipeCreate();

  const { control, handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    createRecipe(data);
    push('/');
  };

  return (
    <form className="relative space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <RecipeFormDetails register={register} />

      <RecipeFormIngredients control={control} register={register} />

      <RecipeFormSteps control={control} register={register} />

      <div className="flex justify-between">
        <Link href="/">
          <a className="p-2">Anuluj</a>
        </Link>
        <Button htmlType="submit" type="primary">
          Utwórz
        </Button>
      </div>
    </form>
  );
};

export default RecipeCreate;
