import axios from 'axios';
import { useQuery } from 'react-query';

const getUser = async (userId) => {
  const res = await axios.get(`/api/users/${userId}`);
  return res.data;
};

const useUser = (userId) => {
  return useQuery(['users', userId], () => getUser(userId));
};

export default useUser;
