import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateRecipe = async (variables, recipeId) => {
  const { data } = await axios.patch(`/api/recipes/${recipeId}`, variables);
  return data;
};

const useRecipeUpdate = (recipeId) => {
  const queryClient = useQueryClient();

  return useMutation((variables) => updateRecipe(variables, recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
};

export default useRecipeUpdate;
