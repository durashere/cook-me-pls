import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const createRecipe = async (values) => {
  const res = await axios.post(`/api/recipes`, values);
  return res.data;
};

const useRecipeCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      queryClient.invalidateQueries('userRecipes');
    },
  });
};

export default useRecipeCreate;
