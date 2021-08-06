import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateRecipe = async (values) => {
  const { data } = await axios.patch(`/api/recipes/${values._id}`, values);
  return data;
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
