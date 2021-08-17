import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Loader from '@/components/Loader';
import RecipeCreate from '@/modules/recipes/components/form/RecipeCreate';

const RecipeCreatePage = () => {
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
      <RecipeCreate />
    </>
  );
};

export default RecipeCreatePage;
