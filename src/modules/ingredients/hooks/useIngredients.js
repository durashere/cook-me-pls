import axios from 'axios';
import { useQuery } from 'react-query';

const getIngredients = async ({ queryKey }) => {
  const [, searchQuery] = queryKey;
  const { data } = await axios.get(`/api/ingredients`, {
    params: {
      searchQuery,
    },
  });
  return data;
};

const useIngredients = (searchQuery) => {
  return useQuery(['ingredients', searchQuery], getIngredients);
};

export default useIngredients;
