import {
  MdOutlineBarChart,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlinePeopleAlt,
  MdOutlineSchedule,
} from 'react-icons/md';
import { dehydrate, QueryClient } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import ErrorPage from 'next/error';

import dbConnect from '@/backend/dbConnect';
import Recipe, { IRecipe } from '@/backend/models/recipe';
import RecipeAuthor from '@/modules/recipes/components/recipe/RecipeAuthor';
import RecipeHeader from '@/modules/recipes/components/recipe/RecipeHeader';
import RecipeInfo from '@/modules/recipes/components/recipe/RecipeInfo';
import RecipeIngredients from '@/modules/recipes/components/recipe/RecipeIngredients';
import RecipeSteps from '@/modules/recipes/components/recipe/RecipeSteps';
import useRecipe from '@/modules/recipes/hooks/useRecipe';
import useServings from '@/modules/recipes/hooks/useServings';

interface IRecipePage {
  params: { recipeId: string };
}

const RecipePage = ({ params: { recipeId } }: IRecipePage): ReactElement => {
  const { data: recipe } = useRecipe(recipeId);

  const { servings, addServing, removeServing } = useServings({
    defaultServings: recipe?.servings,
  });

  if (!recipe) {
    return <ErrorPage statusCode={404} title="Nie znaleziono przepisu" />;
  }

  return (
    <div className="space-y-4">
      <RecipeHeader image={recipe.image} name={recipe.name} />

      <div className="grid grid-cols-3 gap-4">
        <RecipeInfo
          icon={<MdOutlineSchedule className="text-yellow-500" size="3rem" />}
        >
          {recipe.cookTime}
        </RecipeInfo>
        <RecipeInfo
          icon={<MdOutlinePeopleAlt className="text-yellow-500" size="3rem" />}
        >
          <div className="flex justify-center w-full gap-4">
            <button
              className="outline-none focus:outline-none"
              onClick={removeServing}
              type="button"
            >
              <MdOutlineChevronLeft />
            </button>
            <span className="flex justify-center w-4">{servings}</span>
            <button
              className="outline-none focus:outline-none"
              onClick={addServing}
              type="button"
            >
              <MdOutlineChevronRight />
            </button>
          </div>
        </RecipeInfo>
        <RecipeInfo
          icon={<MdOutlineBarChart className="text-yellow-500" size="3rem" />}
        >
          {recipe.difficulty}
        </RecipeInfo>
      </div>

      <RecipeIngredients
        ingredients={recipe.ingredients}
        servings={servings / recipe.servings}
      />

      <RecipeSteps steps={recipe.steps} />

      <RecipeAuthor authorId={recipe.author} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const fetchRecipe = async (): Promise<IRecipe> => {
    await dbConnect();
    const recipe = await Recipe.findById(params?.recipeId).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(recipe));
  };

  await queryClient.prefetchQuery(['recipes', params?.recipeId], () =>
    fetchRecipe()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetchRecipes = async (): Promise<IRecipe[]> => {
    await dbConnect();
    const recipes = await Recipe.find({}).lean();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(recipes));
  };

  const recipes = await fetchRecipes();

  const paths = recipes.map((recipe) => ({
    params: { recipeId: recipe._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default RecipePage;
