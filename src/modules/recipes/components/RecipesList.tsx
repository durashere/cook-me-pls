import { ReactElement } from 'react';

import List from '@/components/List';
import RecipeCard from '@/modules/recipes/components/RecipeCard';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/modules/recipes/hooks/useRecipes';

interface IRecipeList {
  searchQuery: string;
}

const RecipesList = ({ searchQuery }: IRecipeList): ReactElement | null => {
  const { value: searchQueryDebounced } = useDebounce(searchQuery, 300);

  const { data: recipes } = useRecipes(searchQueryDebounced);

  if (!recipes) {
    return null;
  }

  return (
    <List
      items={recipes}
      renderItem={(recipe): ReactElement => <RecipeCard recipe={recipe} />}
    />
  );
};

export default RecipesList;
