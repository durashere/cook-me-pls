import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateRecipeImage = async (values) => {
  const res = await axios.patch(`/api/recipes/${values._id}/image`, values);
  return res.data;
};

const useRecipeImageUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateRecipeImage, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      queryClient.invalidateQueries('userRecipes');
    },
  });
};

export default useRecipeImageUpdate;
