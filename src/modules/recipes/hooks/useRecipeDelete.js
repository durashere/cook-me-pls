import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deleteRecipe = async (recipeId) => {
  const { data } = await axios.delete(`/api/recipes/${recipeId}`);
  return data;
};

const useRecipeDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
};

export default useRecipeDelete;
