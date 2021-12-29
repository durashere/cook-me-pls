import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';

const updateRecipeImage = async (values: FormData): Promise<FormData> => {
  const formData = values;
  const recipeId = formData.get('_id');

  if (typeof recipeId !== 'string') {
    throw new Error('recipeId must be a string');
  }

  const res = await axios.patch<FormData>(
    `/api/recipes/${recipeId}/image`,
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
      await queryClient.invalidateQueries(['recipes', 'list']);
    },
  });
};

export default useRecipeImageUpdate;
