import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IIngredient } from '@/backend/models/ingredient';

const updateIngredient = async (values: IIngredient): Promise<IIngredient> => {
  const res = await axios.patch<IIngredient>(
    `/api/ingredients/${values._id}`,
    values
  );
  return res.data;
};

const useIngredientUpdate = (): UseMutationResult<
  IIngredient,
  AxiosError,
  IIngredient
> => {
  const queryClient = useQueryClient();

  return useMutation(updateIngredient, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('ingredients');
    },
  });
};

export default useIngredientUpdate;
