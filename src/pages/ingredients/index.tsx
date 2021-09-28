import IngredientCreate from '@/modules/ingredients/components/IngredientCreate';
import IngredientList from '@/modules/ingredients/components/IngredientList';

const IngredientsPage = (): JSX.Element => (
  <div className="space-y-8">
    <IngredientCreate />
    <IngredientList />
  </div>
);

IngredientsPage.protect = true;

export default IngredientsPage;
