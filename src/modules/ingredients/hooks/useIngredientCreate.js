import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const createIngredient = async (values) => {
  const res = await axios.post(`/api/ingredients`, values);
  return res.data;
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
