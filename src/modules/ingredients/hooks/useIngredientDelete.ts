import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

const deleteIngredient = async (ingredientId: string): Promise<boolean> => {
  const res = await axios.delete<boolean>(`/api/ingredients/${ingredientId}`);
  return res.data;
};

const useIngredientDelete = (): UseMutationResult<
  boolean,
  AxiosError,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation(deleteIngredient, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('ingredients');
    },
  });
};

export default useIngredientDelete;
