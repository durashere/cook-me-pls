import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateRecipe = async (values) => {
  const res = await axios.patch(`/api/recipes/${values._id}`, values);
  return res.data;
};

const useRecipeUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
};

export default useRecipeUpdate;
