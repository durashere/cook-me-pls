import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const updateRecipeImage = async (variables, recipeId) => {
  const { data } = await axios.patch(`/api/recipes/${recipeId}/image`, variables);
  return data;
};

const useRecipeImageUpdate = (recipeId) => {
  const queryClient = useQueryClient();

  return useMutation((variables) => updateRecipeImage(variables, recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      queryClient.invalidateQueries(['recipes', recipeId]);
    },
  });
};

export default useRecipeImageUpdate;
