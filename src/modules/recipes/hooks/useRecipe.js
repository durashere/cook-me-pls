import axios from 'axios';
import { useQuery } from 'react-query';

const getRecipe = async ({ queryKey }) => {
  const [, recipeId] = queryKey;
  const { data } = await axios.get(`/api/recipes/${recipeId}`);
  return data;
};

const useRecipe = (recipeId) => {
  return useQuery(['recipes', recipeId], getRecipe, {
    enabled: !!recipeId,
  });
};

export default useRecipe;
