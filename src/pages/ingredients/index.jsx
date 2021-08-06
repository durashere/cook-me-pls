import IngredientCreate from '@/modules/ingredients/components/IngredientCreate';
import IngredientList from '@/modules/ingredients/components/IngredientList';

const IngredientsPage = () => {
  return (
    <div className="space-y-8">
      <IngredientCreate />
      <IngredientList />
    </div>
  );
};

export default IngredientsPage;
