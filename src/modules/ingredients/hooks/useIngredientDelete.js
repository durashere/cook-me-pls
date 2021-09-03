import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deleteIngredient = async (ingredientId) => {
  const res = await axios.delete(`/api/ingredients/${ingredientId}`);
  return res.data;
};

const useIngredientDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteIngredient, {
    onSuccess: () => {
      queryClient.invalidateQueries('ingredients');
    },
  });
};

export default useIngredientDelete;
