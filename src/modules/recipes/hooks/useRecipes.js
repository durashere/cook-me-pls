import axios from 'axios';
import { useQuery } from 'react-query';

const getRecipes = async ({ queryKey }) => {
  const [, searchQuery] = queryKey;
  const { data } = await axios.get('/api/recipes', { params: { searchQuery } });
  return data;
};

const useRecipes = (searchQuery) => {
  return useQuery(['recipes', searchQuery], getRecipes);
};

export default useRecipes;
