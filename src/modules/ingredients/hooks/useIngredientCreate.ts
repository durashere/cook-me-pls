import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IIngredient } from '@/backend/models/ingredient';

export type INewIngredient = Pick<IIngredient, 'name' | 'quantity' | 'unit'>;

const createIngredient = async (
  values: INewIngredient
): Promise<IIngredient> => {
  const res = await axios.post<IIngredient>(`/api/ingredients`, values);
  return res.data;
};

const useIngredientCreate = (): UseMutationResult<
  INewIngredient,
  AxiosError,
  INewIngredient,
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
