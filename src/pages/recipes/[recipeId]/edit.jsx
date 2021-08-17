import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Loader from '@/components/Loader';
import RecipeEdit from '@/modules/recipes/components/form/RecipeEdit';

const RecipeEditPage = () => {
  const [session, loading] = useSession();
  const { push } = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (!loading && !session) {
    push('/');
    return <Loader />;
  }

  return (
    <>
      <RecipeEdit />
    </>
  );
};

export default RecipeEditPage;
