import { dehydrate, QueryClient } from 'react-query';
import { GetStaticProps } from 'next';
import { MdOutlineSearch } from 'react-icons/md';
import { ReactElement, useState } from 'react';
import classNames from 'classnames';

import dbConnect from '@/backend/dbConnect';
import Input from '@/components/UI/Input';
import Recipe, { IRecipe } from '@/backend/models/recipe';
import useRecipes from '@/hooks/recipes/useRecipes';
import useDebounce from '@/hooks/useDebounce';
import RecipeCard from '@/components/Recipe/Card';

const RecipesPage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const { value: searchQueryDebounced } = useDebounce(searchQuery, 300);
  const { data: recipes } = useRecipes(searchQueryDebounced);

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
      {recipes?.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
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
