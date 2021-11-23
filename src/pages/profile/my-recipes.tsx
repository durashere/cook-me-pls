import { MdOutlineEdit, MdOutlineVisibility } from 'react-icons/md';
import { ReactElement } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import DeleteModal from '@/components/DeleteModal';
import List from '@/components/List';
import useRecipeDelete from '@/modules/recipes/hooks/useRecipeDelete';
import useUserRecipes from '@/modules/users/hooks/useUserRecipes';

interface IMyRecipesPage {
  session: Session;
}

const RecipesListItem = ({
  name,
  recipeId,
}: {
  name: string;
  recipeId: string;
}): JSX.Element => {
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
}: IMyRecipesPage): JSX.Element | null => {
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

      <List
        items={userRecipes}
        renderItem={({ _id, name }): ReactElement => (
          <RecipesListItem name={name} recipeId={_id} />
        )}
      />
    </div>
  );
};

MyRecipesPage.protect = true;

export default MyRecipesPage;
