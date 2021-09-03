import axios from 'axios';
import { useQuery } from 'react-query';

const getRecipes = async (searchQuery) => {
  const res = await axios.get('/api/recipes', { params: { searchQuery } });
  return res.data;
};

const useRecipes = (searchQuery) => {
  return useQuery(['recipes', searchQuery], () => getRecipes(searchQuery));
};

export default useRecipes;
