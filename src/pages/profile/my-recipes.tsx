import { dehydrate, QueryClient } from 'react-query';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';

import Button from '@/components/Button';
import MyRecipesList from '@/modules/profile/components/MyRecipes';
import Recipe, { IRecipe } from '@/backend/models/recipe';

interface IMyRecipesPage {
  userId: string;
}

const MyRecipesPage = ({ userId }: IMyRecipesPage): JSX.Element => {
  const { push } = useRouter();

  const handleCreateRecipe = async (): Promise<void> => {
    await push('/recipes/create');
  };

  return (
    <div className="space-y-4">
      <Button fullWidth onClick={handleCreateRecipe}>
        Dodaj przepis
      </Button>
      <MyRecipesList userId={userId} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  const fetchUserRecipes = async (): Promise<IRecipe[]> => {
    await mongoose.connect(process.env.MONGODB_URL as string);
    const userRecipes = await Recipe.find({ author: session?.user._id })
      .sort({ name: 1 })
      .lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(userRecipes));
  };

  await queryClient.prefetchQuery(['userRecipes', session?.user._id], () =>
    fetchUserRecipes()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId: session?.user._id,
    },
  };
};

export default MyRecipesPage;
