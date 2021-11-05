import { dehydrate, QueryClient } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import mongoose from 'mongoose';

import Recipe from '@/backend/models/recipe';
import User, { IUser } from '@/backend/models/user';
import UserRecipesHeader from '@/modules/users/components/UserRecipesHeader';
import UserRecipesList from '@/modules/users/components/UserRecipesList';

interface IUserRecipesPage {
  params: { userId: string };
}

const UserRecipesPage = ({
  params: { userId },
}: IUserRecipesPage): JSX.Element => (
  <div className="space-y-4">
    <UserRecipesHeader userId={userId} />
    <UserRecipesList userId={userId} />
  </div>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const fetchUser = async (): Promise<IUser> => {
    await mongoose.connect(process.env.MONGODB_URL as string);
    const user = await User.findById(params?.userId).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(user));
  };

  await queryClient.prefetchQuery(['users', params?.userId], () => fetchUser());

  const fetchUserRecipes = async (): Promise<IUser> => {
    await mongoose.connect(process.env.MONGODB_URL as string);
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
  await mongoose.connect(process.env.MONGODB_URL as string);

  const users = await User.find({}).lean();

  const paths = users.map((user) => ({
    params: { userId: user._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default UserRecipesPage;
