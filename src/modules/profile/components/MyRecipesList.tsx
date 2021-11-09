import { useRouter } from 'next/router';

import { IRecipe } from '@/backend/models/recipe';
import Button from '@/components/Button';
import DeleteModal from '@/components/DeleteModal';
import useRecipeDelete from '@/modules/recipes/hooks/useRecipeDelete';
import useUserRecipes from '@/modules/users/hooks/useUserRecipes';
import Loader from '@/components/Loader';

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
    <li className="p-4 space-y-4 overflow-hidden bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="flex items-center justify-end gap-2">
        <DeleteModal
          description="Czy jesteś pewny, że chcesz usunąć ten przepis? Tej czynności nie można cofnąć."
          onSubmit={handleDeleteRecipe}
          title="Usuń przepis"
        />
        <Button icon="edit" onClick={handleEditRecipe}>
          Edytuj
        </Button>
        <Button icon="visibility" onClick={handleViewRecipe} />
      </div>
    </li>
  );
};

interface IMyRecipes {
  userId: string;
}

const MyRecipesList = ({ userId }: IMyRecipes): JSX.Element => {
  const { data: userRecipes, status: statusUserRecipes } =
    useUserRecipes(userId);

  if (!userRecipes || statusUserRecipes === 'loading') {
    return <Loader />;
  }

  if (userRecipes.length === 0) {
    return (
      <div className="p-4 text-center bg-white rounded-md shadow-md">
        Nie dodałeś jeszcze żadnego przepisu
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {userRecipes.map((recipe: IRecipe) => (
        <RecipesListItem
          key={recipe._id}
          name={recipe.name}
          recipeId={recipe._id}
        />
      ))}
    </ul>
  );
};

export default MyRecipesList;
