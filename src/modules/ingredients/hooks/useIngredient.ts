import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IIngredient } from '@/backend/models/ingredient';

const getIngredient = async (ingredientId: string): Promise<IIngredient> => {
  const res = await axios.get<IIngredient>(`/api/ingredients/${ingredientId}`);
  return res.data;
};

const useIngredient = (
  ingredientId: string
): UseQueryResult<IIngredient, AxiosError> =>
  useQuery(['ingredients', ingredientId], () => getIngredient(ingredientId), {
    enabled: !!ingredientId,
  });

export default useIngredient;
