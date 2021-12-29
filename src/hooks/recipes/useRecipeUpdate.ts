import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IRecipe } from '@/backend/models/recipe';

const updateRecipe = async (values: IRecipe): Promise<IRecipe> => {
  const res = await axios.patch<IRecipe>(`/api/recipes/${values._id}`, values);
  return res.data;
};

const useRecipeUpdate = (): UseMutationResult<IRecipe, AxiosError, IRecipe> => {
  const queryClient = useQueryClient();

  return useMutation(updateRecipe, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['recipes', 'list']);
    },
  });
};

export default useRecipeUpdate;
