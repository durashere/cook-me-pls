import { ReactElement } from 'react';

import List from '@/components/List';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

interface IRecipeList {
  searchQuery: string;
}

const RecipesList = ({ searchQuery }: IRecipeList): JSX.Element | null => {
  const { value: searchQueryDebounced } = useDebounce(searchQuery, 300);

  const { data: recipes } = useRecipes(searchQueryDebounced);

  if (!recipes) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <List
        items={recipes}
        renderItem={(recipe): ReactElement => <RecipeCard recipe={recipe} />}
      />
    </div>
  );
};

export default RecipesList;
