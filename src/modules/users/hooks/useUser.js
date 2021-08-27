import axios from 'axios';
import { useQuery } from 'react-query';

const getUser = async ({ queryKey }) => {
  const [, userId] = queryKey;
  const { data } = await axios.get(`/api/users/${userId}`);
  return data;
};

const useUser = (userId) => {
  return useQuery(['users', userId], getUser);
};

export default useUser;
