import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosError } from 'axios';

import { IRecipe } from '@/backend/models/recipe';

const getUserRecipes = async (userId: string): Promise<IRecipe[]> => {
  const res = await axios.get<IRecipe[]>(`/api/users/${userId}/recipes`);
  return res.data;
};

const useUserRecipes = (
  userId: string
): UseQueryResult<IRecipe[], AxiosError> =>
  useQuery(['userRecipes', userId], () => getUserRecipes(userId));

export default useUserRecipes;
