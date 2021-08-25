import axios from 'axios';
import { useQuery } from 'react-query';

const getUserRecipes = async ({ queryKey }) => {
  const [, userId] = queryKey;
  const { data } = await axios.get(`/api/users/${userId}/recipes`);
  return data;
};

const useUserRecipes = (userId) => {
  return useQuery(['userRecipes', userId], getUserRecipes);
};

export default useUserRecipes;
