import { useState } from 'react';

import RecipeList from '@/modules/recipes/components/RecipeList';
import RecipeSearch from '@/modules/recipes/components/RecipeSearch';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-4">
      <RecipeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <RecipeList searchQuery={searchQuery} />
    </div>
  );
};

export default RecipesPage;
