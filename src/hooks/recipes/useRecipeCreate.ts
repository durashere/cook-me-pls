import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IRecipe } from '@/backend/models/recipe';

const createRecipe = async (values: IRecipe): Promise<IRecipe> => {
  const res = await axios.post<IRecipe>(`/api/recipes`, values);
  return res.data;
};

const useRecipeCreate = (): UseMutationResult<IRecipe, AxiosError, IRecipe> => {
  const queryClient = useQueryClient();

  return useMutation(createRecipe, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['recipes', 'list']);
    },
  });
};

export default useRecipeCreate;
