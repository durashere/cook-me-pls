import MyRecipesList from '@/modules/profile/components/MyRecipes';
import withProtect from '@/components/withProtect';

const MyRecipesPage = (): JSX.Element => <MyRecipesList />;

export default withProtect(MyRecipesPage);
