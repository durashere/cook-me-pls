import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateIngredient = async (values) => {
  const { data } = await axios.patch(`/api/ingredients/${values._id}`, values);
  return data;
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
