import { GetStaticPaths, GetStaticProps } from 'next';
import ErrorPage from 'next/error';
import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import dbConnect from 'backend/dbConnect';
import Recipe, { IRecipe } from 'backend/models/recipe';
import User, { IUser } from 'backend/models/user';
import RecipeCard from 'components/Recipe/Card';
import useRecipes from 'hooks/recipes/useRecipes';
import useUser from 'hooks/users/useUser';

interface IUserRecipesPage {
  params: { userId: string };
}

function UserRecipesPage({
  params: { userId },
}: IUserRecipesPage): ReactElement | null {
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
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const getUser = async (): Promise<IUser> => {
    await dbConnect();
    const user = await User.findById(params?.userId);
    return JSON.parse(JSON.stringify(user));
  };

  await queryClient.prefetchQuery(['users', 'detail', params?.userId], getUser);

  const getRecipes = async (): Promise<IRecipe[]> => {
    const recipes = await Recipe.find({ author: params?.userId });
    return JSON.parse(JSON.stringify(recipes));
  };

  await queryClient.prefetchQuery(
    ['recipes', 'list', { author: params?.userId }],
    getRecipes
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
    await dbConnect();
    const users = await User.find({});
    return JSON.parse(JSON.stringify(users));
  };

  const users = await getUsers();

  const paths = users.map((user) => ({
    params: { userId: user._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default UserRecipesPage;
