import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const createRecipe = async (newRecipe) => {
  const { data } = await axios.post(`/api/recipes`, newRecipe);
  return data;
};

const useRecipeCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
};

export default useRecipeCreate;
