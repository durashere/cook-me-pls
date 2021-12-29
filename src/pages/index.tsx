import { dehydrate, QueryClient } from 'react-query';
import { GetStaticProps } from 'next';
import { MdOutlineSearch } from 'react-icons/md';
import { ReactElement, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { IRecipe } from '@/backend/models/recipe';
import Input from '@/components/UI/Input';
import RecipeCard from '@/components/Recipe/Card';
import useDebounce from '@/hooks/useDebounce';
import useRecipes from '@/hooks/recipes/useRecipes';

const RecipesPage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState({ name: '' });
  const searchQueryNameDebounced = useDebounce(searchQuery.name, 300);

  const { data: recipes } = useRecipes({
    name: searchQueryNameDebounced,
  });

  const handleSearch = (e: React.FormEvent<HTMLInputElement>): void =>
    setSearchQuery({ ...searchQuery, name: e.currentTarget.value });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          fullWidth
          onChange={handleSearch}
          placeholder="Szukaj przepisu..."
          type="search"
          value={searchQuery.name}
        />
        <MdOutlineSearch
          className={classNames(
            'absolute top-0 right-2 w-10 h-10 p-2 text-gray-300 pointer-events-none transition-all',
            {
              'opacity-0': searchQuery.name,
              'opacity-100 ': !searchQuery.name,
            }
          )}
        />
      </div>
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const getRecipes = async (): Promise<IRecipe[]> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IRecipe[]>(
      `${dev ? DEV_URL : PROD_URL}/api/recipes`,
      { params: { name: '' } }
    );
    return res.data;
  };

  await queryClient.prefetchQuery(
    ['recipes', 'list', { name: '' }],
    getRecipes
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default RecipesPage;
