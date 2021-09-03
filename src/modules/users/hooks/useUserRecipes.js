import axios from 'axios';
import { useQuery } from 'react-query';

const getUserRecipes = async (userId) => {
  const res = await axios.get(`/api/users/${userId}/recipes`);
  return res.data;
};

const useUserRecipes = (userId) => {
  return useQuery(['userRecipes', userId], () => getUserRecipes(userId));
};

export default useUserRecipes;
