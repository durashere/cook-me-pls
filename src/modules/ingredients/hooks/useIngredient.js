import axios from 'axios';
import { useQuery } from 'react-query';

const getIngredient = async (ingredientId) => {
  const res = await axios.get(`/api/ingredients/${ingredientId}`);
  return res.data;
};

const useIngredient = (ingredientId) => {
  return useQuery(['ingredients', ingredientId], () => getIngredient(ingredientId), {
    enabled: !!ingredientId,
  });
};

export default useIngredient;
