import { useRouter } from 'next/router';
import { Session } from 'next-auth';

import Button from '@/components/Button';
import MyRecipesList from '@/modules/profile/components/MyRecipesList';

interface IMyRecipesPage {
  session: Session;
}

const MyRecipesPage = ({ session }: IMyRecipesPage): JSX.Element => {
  const { push } = useRouter();

  const handleCreateRecipe = async (): Promise<void> => {
    await push('/recipes/create');
  };

  return (
    <div className="space-y-4">
      <Button fullWidth onClick={handleCreateRecipe}>
        Dodaj przepis
      </Button>
      <MyRecipesList userId={session.user._id} />
    </div>
  );
};

MyRecipesPage.protect = true;

export default MyRecipesPage;
