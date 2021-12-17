import { dehydrate, QueryClient } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import ErrorPage from 'next/error';

import dbConnect from '@/backend/dbConnect';
import Recipe from '@/backend/models/recipe';
import RecipeCard from '@/components/Recipe/Card';
import User, { IUser } from '@/backend/models/user';
import useUser from '@/hooks/users/useUser';
import useUserRecipes from '@/hooks/users/useUserRecipes';

interface IUserRecipesPage {
  params: { userId: string };
}

const UserRecipesPage = ({
  params: { userId },
}: IUserRecipesPage): ReactElement | null => {
  const { data: userRecipes, status: userRecipesStatus } =
    useUserRecipes(userId);
  const { data: user, status: userStatus } = useUser(userId);

  if (userRecipesStatus === 'loading' || userStatus === 'loading') {
    return null;
  }

  if (userStatus === 'error') {
    return <ErrorPage statusCode={404} title="Nie znaleziono użytkownika" />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl text-center">
        Przepisy użytkownika
        <span className="block font-bold">{user?.name}</span>
      </h1>
      {userRecipes?.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const fetchUser = async (): Promise<IUser> => {
    await dbConnect();
    const user = await User.findById(params?.userId).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(user));
  };

  await queryClient.prefetchQuery(['users', params?.userId], () => fetchUser());

  const fetchUserRecipes = async (): Promise<IUser> => {
    await dbConnect();
    const recipe = await Recipe.find({ author: params?.userId })
      .sort({ name: 1 })
      .lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(recipe));
  };

  await queryClient.prefetchQuery(['userRecipes', params?.userId], () =>
    fetchUserRecipes()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetchUsers = async (): Promise<IUser[]> => {
    await dbConnect();
    const users = await User.find({}).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(users));
  };

  const users = await fetchUsers();

  const paths = users.map((user) => ({
    params: { userId: user._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default UserRecipesPage;
