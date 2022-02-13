import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { IUser } from 'backend/models/user';

const getUser = async (userId: string): Promise<IUser> => {
  const res = await axios.get<IUser>(`/api/users/${userId}`);
  return res.data;
};

const useUser = (userId: string): UseQueryResult<IUser, AxiosError> =>
  useQuery(['users', 'detail', userId], () => getUser(userId));

export default useUser;
