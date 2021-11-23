import { dehydrate, QueryClient } from 'react-query';
import { GetStaticProps } from 'next';
import { MdOutlineSearch } from 'react-icons/md';
import { ReactElement, useState } from 'react';
import classNames from 'classnames';

import dbConnect from '@/backend/dbConnect';
import Input from '@/components/Input';
import Recipe, { IRecipe } from '@/backend/models/recipe';
import RecipesList from '@/modules/recipes/components/RecipesList';

const RecipesPage = (): ReactElement => {
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
        <MdOutlineSearch
          className={classNames(
            'absolute top-0 right-2 w-10 h-10 p-2 text-gray-300 pointer-events-none transition-all',
            {
              'opacity-0': searchQuery,
              'opacity-100 ': !searchQuery,
            }
          )}
        />
      </div>
      <RecipesList searchQuery={searchQuery} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const fetchRecipes = async (): Promise<IRecipe[]> => {
    await dbConnect();
    const recipes = await Recipe.find({}).sort({ name: 1 }).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(recipes));
  };

  await queryClient.prefetchQuery(['recipes', ''], () => fetchRecipes());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default RecipesPage;
