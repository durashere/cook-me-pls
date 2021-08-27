import MyRecipes from '@/modules/profile/components/MyRecipes';
import withProtect from '@/components/withProtect';

const MyRecipesPage = () => {
  return (
    <>
      <MyRecipes />
    </>
  );
};

export default withProtect(MyRecipesPage);
