import axios from 'axios';
import { useQuery } from 'react-query';

const getIngredient = async ({ queryKey }) => {
  const [, ingredientId] = queryKey;
  const { data } = await axios.get(`/api/ingredients/${ingredientId}`);
  return data;
};

const useIngredient = (ingredientId) => {
  return useQuery(['ingredients', ingredientId], getIngredient, {
    enabled: !!ingredientId,
  });
};

export default useIngredient;
