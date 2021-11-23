import { dehydrate, QueryClient } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';

import dbConnect from '@/backend/dbConnect';
import List from '@/components/List';
import Recipe from '@/backend/models/recipe';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import User, { IUser } from '@/backend/models/user';
import UserRecipesHeader from '@/modules/users/components/UserRecipesHeader';
import useUserRecipes from '@/modules/users/hooks/useUserRecipes';

interface IUserRecipesPage {
  params: { userId: string };
}

const UserRecipesPage = ({
  params: { userId },
}: IUserRecipesPage): ReactElement | null => {
  const { data: userRecipes } = useUserRecipes(userId);

  if (!userRecipes) {
    return null;
  }

  return (
    <div className="space-y-4">
      <UserRecipesHeader userId={userId} />
      <List
        items={userRecipes}
        renderItem={(recipe): React.ReactElement => (
          <RecipeCard recipe={recipe} />
        )}
      />
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
