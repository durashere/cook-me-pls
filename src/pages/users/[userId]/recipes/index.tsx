import { dehydrate, QueryClient } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import axios from 'axios';
import ErrorPage from 'next/error';

import { IRecipe } from '@/backend/models/recipe';
import RecipeCard from '@/components/Recipe/Card';
import { IUser } from '@/backend/models/user';
import useRecipes from '@/hooks/recipes/useRecipes';
import useUser from '@/hooks/users/useUser';

interface IUserRecipesPage {
  params: { userId: string };
}

const UserRecipesPage = ({
  params: { userId },
}: IUserRecipesPage): ReactElement | null => {
  const { data: recipes, status: recipesStatus } = useRecipes({
    author: userId,
  });
  const { data: user, status: userStatus } = useUser(userId);

  if (recipesStatus === 'loading' || userStatus === 'loading') {
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
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const getUser = async (): Promise<IUser> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IUser>(
      `${dev ? DEV_URL : PROD_URL}/api/users/${params?.userId}`
    );

    return res.data;
  };

  await queryClient.prefetchQuery(['users', 'detail', params?.userId], () =>
    getUser()
  );

  const getRecipes = async (): Promise<IRecipe[]> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IRecipe[]>(
      `${dev ? DEV_URL : PROD_URL}/api/recipes`,
      { params: { author: params?.userId } }
    );

    return res.data;
  };

  await queryClient.prefetchQuery(
    ['recipes', 'list', { author: params?.userId }],
    () => getRecipes()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getUsers = async (): Promise<IUser[]> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IUser[]>(
      `${dev ? DEV_URL : PROD_URL}/api/users`
    );

    return res.data;
  };

  const users = await getUsers();

  const paths = users.map((user) => ({
    params: { userId: user._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default UserRecipesPage;
