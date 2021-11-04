import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IRecipe } from '@/backend/models/recipe';

const getRecipe = async (recipeId?: string): Promise<IRecipe> => {
  if (!recipeId) {
    throw new Error('recipeId must be specified');
  }

  const res = await axios.get<IRecipe>(`/api/recipes/${recipeId}`);
  return res.data;
};

const useRecipe = (recipeId?: string): UseQueryResult<IRecipe, AxiosError> =>
  useQuery(['recipes', recipeId], () => getRecipe(recipeId), {
    enabled: Boolean(recipeId),
  });

export default useRecipe;
