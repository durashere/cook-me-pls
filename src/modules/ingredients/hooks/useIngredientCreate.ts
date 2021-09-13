import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IIngredient } from '@/backend/models/ingredient';

const createIngredient = async (values: IIngredient): Promise<IIngredient> => {
  const res = await axios.post<IIngredient>(`/api/ingredients`, values);
  return res.data;
};

const useIngredientCreate = (): UseMutationResult<
  IIngredient,
  AxiosError,
  IIngredient,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation(createIngredient, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('ingredients');
    },
  });
};

export default useIngredientCreate;
