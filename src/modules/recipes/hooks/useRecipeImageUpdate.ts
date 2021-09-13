import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

const updateRecipeImage = async (values: FormData): Promise<FormData> => {
  const formData = values;
  const recipeId = formData.get('_id');

  const res = await axios.patch<FormData>(
    `/api/recipes/${recipeId as string}/image`,
    values
  );
  return res.data;
};

const useRecipeImageUpdate = (): UseMutationResult<
  FormData,
  AxiosError,
  FormData
> => {
  const queryClient = useQueryClient();

  return useMutation(updateRecipeImage, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('recipes');
      await queryClient.invalidateQueries('userRecipes');
    },
  });
};

export default useRecipeImageUpdate;
