import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { IRecipe } from 'backend/models/recipe';

const getRecipes = async ({
  author,
  name,
  difficulty,
  cookTime,
  limit,
}: {
  author?: string;
  name?: string;
  difficulty?: string;
  cookTime?: string;
  limit?: number;
}): Promise<IRecipe[]> => {
  const res = await axios.get<IRecipe[]>('/api/recipes', {
    params: { author, name, difficulty, cookTime, limit },
  });
  return res.data;
};

const useRecipes = ({
  author,
  name,
  difficulty,
  cookTime,
  limit,
}: {
  author?: string;
  name?: string;
  difficulty?: string;
  cookTime?: string;
  limit?: number;
}): UseQueryResult<IRecipe[], AxiosError> =>
  useQuery(
    ['recipes', 'list', { author, name, difficulty, cookTime, limit }],
    () => getRecipes({ author, name, difficulty, cookTime, limit }),
    {
      keepPreviousData: true,
    }
  );

export default useRecipes;
