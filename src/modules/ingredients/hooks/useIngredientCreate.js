import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const createIngredient = async (newIngredient) => {
  const { data } = await axios.post(`/api/ingredients`, newIngredient);
  return data;
};

const useIngredientCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createIngredient, {
    onSuccess: () => {
      queryClient.invalidateQueries('ingredients');
    },
  });
};

export default useIngredientCreate;
