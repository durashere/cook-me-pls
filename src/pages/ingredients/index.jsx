import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import IngredientCreate from '@/modules/ingredients/components/IngredientCreate';
import IngredientList from '@/modules/ingredients/components/IngredientList';
import Loader from '@/components/Loader';

const IngredientsPage = () => {
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
    <div className="space-y-8">
      <IngredientCreate />
      <IngredientList />
    </div>
  );
};

export default IngredientsPage;
