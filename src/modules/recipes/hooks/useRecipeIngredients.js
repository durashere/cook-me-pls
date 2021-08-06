import axios from 'axios';
import { useQuery } from 'react-query';

const getRecipeIngredients = async ({ queryKey }) => {
  const [, recipeId] = queryKey;
  const { data } = await axios.get(`/api/recipes/${recipeId}/ingredients`);
  return data;
};

const useRecipeIngredients = (recipeId) => {
  return useQuery(['recipes-ingredients', recipeId], getRecipeIngredients);
};

export default useRecipeIngredients;
