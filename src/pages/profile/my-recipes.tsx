import { MdOutlineEdit, MdOutlineVisibility } from 'react-icons/md';
import { ReactElement } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

import Button from '@/components/UI/Button';
import DeleteModal from '@/components/UI/DeleteModal';
import useRecipeDelete from '@/hooks/recipes/useRecipeDelete';
import useUserRecipes from '@/hooks/users/useUserRecipes';

interface IMyRecipesPage {
  session: Session;
}

const RecipesListItem = ({
  name,
  recipeId,
}: {
  name: string;
  recipeId: string;
}): ReactElement => {
  const { push } = useRouter();
  const { mutate: deleteRecipe } = useRecipeDelete();

  const handleDeleteRecipe = (): void => {
    deleteRecipe(recipeId);
  };

  const handleEditRecipe = async (): Promise<void> => {
    await push(`/recipes/${recipeId}/edit`);
  };

  const handleViewRecipe = async (): Promise<void> => {
    await push(`/recipes/${recipeId}`);
  };

  return (
    <div className="p-4 space-y-4 overflow-hidden bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="flex items-center justify-end gap-2">
        <DeleteModal
          description="Czy jesteś pewny, że chcesz usunąć ten przepis? Tej czynności nie można cofnąć."
          onSubmit={handleDeleteRecipe}
          title="Usuń przepis"
        />
        <Button icon={<MdOutlineEdit />} onClick={handleEditRecipe}>
          Edytuj
        </Button>
        <Button icon={<MdOutlineVisibility />} onClick={handleViewRecipe} />
      </div>
    </div>
  );
};

const MyRecipesPage = ({
  session: {
    user: { _id: userId },
  },
}: IMyRecipesPage): ReactElement | null => {
  const { push } = useRouter();

  const { data: userRecipes } = useUserRecipes(userId);

  const handleCreateRecipe = async (): Promise<void> => {
    await push('/recipes/create');
  };

  if (!userRecipes) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Button fullWidth onClick={handleCreateRecipe}>
        Dodaj przepis
      </Button>
      {userRecipes.map(({ _id, name }) => (
        <RecipesListItem name={name} recipeId={_id} />
      ))}
    </div>
  );
};

MyRecipesPage.protect = true;

export default MyRecipesPage;
