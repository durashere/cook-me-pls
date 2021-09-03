import axios from 'axios';
import { useQuery } from 'react-query';

const getIngredients = async (searchQuery) => {
  const res = await axios.get(`/api/ingredients`, {
    params: {
      searchQuery,
    },
  });
  return res.data;
};

const useIngredients = (searchQuery) => {
  return useQuery(['ingredients', searchQuery], () => getIngredients(searchQuery));
};

export default useIngredients;
