import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IRecipe } from '@/backend/models/recipe';

const getRecipes = async (searchQuery: string): Promise<IRecipe[]> => {
  const res = await axios.get<IRecipe[]>('/api/recipes', {
    params: { searchQuery },
  });
  return res.data;
};

const useRecipes = (
  searchQuery: string
): UseQueryResult<IRecipe[], AxiosError> =>
  useQuery(['recipes', searchQuery], () => getRecipes(searchQuery), {
    keepPreviousData: true,
  });

export default useRecipes;
