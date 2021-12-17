import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

const deleteRecipe = async (recipeId: string): Promise<boolean> => {
  const res = await axios.delete<boolean>(`/api/recipes/${recipeId}`);
  return res.data;
};

const useRecipeDelete = (): UseMutationResult<boolean, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation(deleteRecipe, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('recipes');
      await queryClient.invalidateQueries('userRecipes');
    },
  });
};

export default useRecipeDelete;
