import classNames from 'classnames';
import { GetStaticProps } from 'next';
import { ReactElement, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { dehydrate, QueryClient } from 'react-query';

import dbConnect from 'backend/dbConnect';
import Recipe, { IRecipe } from 'backend/models/recipe';
import RecipeCard from 'components/Recipe/Card';
import Input from 'components/UI/Input';
import useRecipes from 'hooks/recipes/useRecipes';
import useDebounce from 'hooks/useDebounce';

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
    await dbConnect();
    const recipes = await Recipe.find({}).sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(recipes));
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
