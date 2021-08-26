import RecipeCreate from '@/modules/recipes/components/form/RecipeCreate';
import withProtect from '@/components/withProtect';

const RecipeCreatePage = () => {
  return (
    <>
      <RecipeCreate />
    </>
  );
};

export default withProtect(RecipeCreatePage);
