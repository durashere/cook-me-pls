import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deleteRecipe = async (recipeId) => {
  const res = await axios.delete(`/api/recipes/${recipeId}`);
  return res.data;
};

const useRecipeDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      queryClient.invalidateQueries('userRecipes');
    },
  });
};

export default useRecipeDelete;
