import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateIngredient = async (values) => {
  const res = await axios.patch(`/api/ingredients/${values._id}`, values);
  return res.data;
};

const useIngredientUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateIngredient, {
    onSuccess: () => {
      queryClient.invalidateQueries('ingredients');
    },
  });
};

export default useIngredientUpdate;
