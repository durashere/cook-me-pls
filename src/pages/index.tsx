import { useState } from 'react';
import classNames from 'classnames';

import RecipeList from '@/modules/recipes/components/RecipeList';
import Input from '@/components/Input';

const RecipesPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLInputElement>): void =>
    setSearchQuery(e.currentTarget.value);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          fullWidth
          onChange={handleSearch}
          placeholder="Szukaj przepisu..."
          type="search"
          value={searchQuery}
        />
        <span
          className={classNames(
            'absolute top-0 right-2 w-10 h-10 p-2 text-gray-300 pointer-events-none transition-all material-icons-outlined',
            {
              'opacity-0': searchQuery,
              'opacity-100 ': !searchQuery,
            }
          )}
        >
          search
        </span>
      </div>
      <RecipeList searchQuery={searchQuery} />
    </div>
  );
};

export default RecipesPage;
