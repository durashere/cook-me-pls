import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Button from '@/components/Button';
import Loader from '@/components/Loader';
import useRecipeDelete from '@/modules/recipes/hooks/useRecipeDelete';
import useUserRecipes from '@/modules/users/hooks/useUserRecipes';

const Recipe = ({ name, recipeId }) => {
  const { push } = useRouter();
  const { mutate: deleteRecipe, status: deleteRecipeStatus } = useRecipeDelete();

  const handleDeleteRecipe = () => {
    deleteRecipe(recipeId);
  };

  const handleEditRecipe = () => {
    push(`/recipes/${recipeId}/edit`);
  };

  return (
    <li className="flex items-center justify-between gap-4 p-4 overflow-hidden bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold truncate">{name}</h1>
      <div className="flex gap-4">
        <Button
          icon="delete"
          loading={deleteRecipeStatus === 'loading'}
          onClick={handleDeleteRecipe}
          type="danger"
        />
        <Button icon="edit" onClick={handleEditRecipe} />
      </div>
    </li>
  );
};

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};

const UserRecipes = () => {
  const {
    query: { userId },
  } = useRouter();

  const { data: userRecipes, status: userRecipesStatus } = useUserRecipes(userId);

  if (userRecipesStatus === 'idle' || userRecipesStatus === 'loading') {
    return <Loader />;
  }

  return (
    <div>
      <ul className="space-y-4">
        {userRecipes.map((recipe) => (
          <Recipe key={recipe._id} name={recipe.name} recipeId={recipe._id} />
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
