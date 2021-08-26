import RecipeEdit from '@/modules/recipes/components/form/RecipeEdit';
import withProtect from '@/components/withProtect';

const RecipeEditPage = () => {
  return (
    <>
      <RecipeEdit />
    </>
  );
};

export default withProtect(RecipeEditPage);
