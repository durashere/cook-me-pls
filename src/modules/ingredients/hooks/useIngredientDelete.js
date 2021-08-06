import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deleteIngredient = async (ingredientId) => {
  const { data } = await axios.delete(`/api/ingredients/${ingredientId}`);
  return data;
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
