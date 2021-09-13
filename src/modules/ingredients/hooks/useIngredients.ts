import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IIngredient } from '@/backend/models/ingredient';

const getIngredients = async (searchQuery?: string): Promise<IIngredient[]> => {
  const res = await axios.get<IIngredient[]>(`/api/ingredients`, {
    params: {
      searchQuery,
    },
  });
  return res.data;
};

const useIngredients = (
  searchQuery?: string
): UseQueryResult<IIngredient[], AxiosError> =>
  useQuery(['ingredients', searchQuery], () => getIngredients(searchQuery));

export default useIngredients;
