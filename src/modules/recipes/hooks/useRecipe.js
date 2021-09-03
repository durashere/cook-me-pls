import axios from 'axios';
import { useQuery } from 'react-query';

const getRecipe = async (recipeId) => {
  const res = await axios.get(`/api/recipes/${recipeId}`);
  return res.data;
};

const useRecipe = (recipeId) => {
  return useQuery(['recipes', recipeId], () => getRecipe(recipeId), { enabled: !!recipeId });
};

export default useRecipe;
