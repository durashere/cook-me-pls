import ErrorPage from 'next/error';

import Loader from '@/components/Loader';
import useUser from '@/modules/users/hooks/useUser';

interface IUserRecipesHeader {
  userId: string;
}

const UserRecipesHeader = ({ userId }: IUserRecipesHeader): JSX.Element => {
  const { data: user, status: userStatus } = useUser(userId);

  if (userStatus === 'loading') {
    return <Loader />;
  }

  if (!user) {
    return <ErrorPage statusCode={404} title="Nie znaleziono użytkownika" />;
  }

  return (
    <h1 className="text-2xl text-center">
      Przepisy użytkownika <span className="block font-bold">{user.name}</span>
    </h1>
  );
};

export default UserRecipesHeader;
