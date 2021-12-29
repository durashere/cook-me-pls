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
import axios from 'axios';
import ErrorPage from 'next/error';
import Image from 'next/image';
import Link from 'next/link';

import { IIngredient, IRecipe, IStep } from '@/backend/models/recipe';
import RecipeSection from '@/components/Recipe/Section';
import useRecipe from '@/hooks/recipes/useRecipe';
import useServings from '@/hooks/recipes/useServings';
import useUser from '@/hooks/users/useUser';

interface IRecipePage {
  authorId: string;
  params: { recipeId: string };
}

const RecipePage = ({
  authorId,
  params: { recipeId },
}: IRecipePage): ReactElement | null => {
  const { data: recipe, status: recipeStatus } = useRecipe(recipeId);
  const { data: author, status: authorStatus } = useUser(authorId);

  const { servings, addServing, removeServing } = useServings({
    defaultServings: recipe?.servings,
  });

  if (recipeStatus === 'loading' || authorStatus === 'loading') {
    return null;
  }

  if (recipeStatus === 'error') {
    return <ErrorPage statusCode={404} title="Nie znaleziono przepisu" />;
  }
  if (authorStatus === 'error') {
    return <ErrorPage statusCode={404} title="Nie znaleziono autora" />;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-md shadow-md">
          <div className="relative aspect-square">
            <Image
              alt="Picture of the dish"
              layout="fill"
              objectFit="cover"
              priority
              src={recipe?.image || '/image-placeholder.png'}
            />
          </div>
        </div>
        <h1 className="px-4 text-2xl font-bold text-center">{recipe?.name}</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <RecipeSection>
          <div className="flex flex-col items-center justify-center">
            <MdOutlineSchedule className="text-yellow-500" size="3rem" />
            <span className="font-bold text-yellow-500">
              {recipe?.cookTime}
            </span>
          </div>
        </RecipeSection>
        <RecipeSection>
          <div className="flex flex-col items-center justify-center">
            <MdOutlinePeopleAlt className="text-yellow-500" size="3rem" />
            <div className="flex justify-center w-full gap-4 text-yellow-500">
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
          </div>
        </RecipeSection>
        <RecipeSection>
          <div className="flex flex-col items-center justify-center">
            <MdOutlineBarChart className="text-yellow-500" size="3rem" />
            <span className="font-bold text-yellow-500">
              {recipe?.difficulty}
            </span>
          </div>
        </RecipeSection>
      </div>

      <RecipeSection>
        <ul className="divide-y-2 divide-dotted">
          {recipe?.ingredients.map((ingredient: IIngredient) => (
            <li
              key={ingredient._id}
              className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
            >
              <span className="font-medium text-gray-600 first-letter:capitalize">
                {ingredient.name}
              </span>
              <span className="text-sm text-gray-500">{`${
                ingredient.quantity * servings
              } ${ingredient.unit}`}</span>
            </li>
          ))}
        </ul>
      </RecipeSection>

      <RecipeSection>
        <ul className="space-y-8">
          {recipe?.steps.map((step: IStep, index: number) => (
            <li key={step._id}>
              <p className="text-lg font-medium text-gray-600">
                Krok {index + 1}
              </p>
              <p className="px-4 py-2 m-2 text-sm text-gray-500 border-l-2">
                {step.instruction}
              </p>
            </li>
          ))}
        </ul>
      </RecipeSection>

      <div className="flex items-center justify-center">
        <Link href={`/users/${recipe?.author}/recipes`} passHref>
          <div className="flex items-center cursor-pointer">
            <p className="text-lg">
              <span className="text-base text-gray-400">Więcej od: </span>
              {author?.name}
            </p>
            <MdOutlineChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const getRecipe = async (): Promise<IRecipe> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IRecipe>(
      `${dev ? DEV_URL : PROD_URL}/api/recipes/${params?.recipeId}`
    );

    return res.data;
  };

  const recipe = await getRecipe();

  await queryClient.prefetchQuery(
    ['recipes', 'detail', params?.recipeId],
    getRecipe
  );

  return {
    props: {
      authorId: recipe.author,
      dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getRecipes = async (): Promise<IRecipe[]> => {
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    const res = await axios.get<IRecipe[]>(
      `${dev ? DEV_URL : PROD_URL}/api/recipes`
    );

    return res.data;
  };

  const recipes = await getRecipes();

  const paths = recipes.map((recipe) => ({
    params: { recipeId: recipe._id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export default RecipePage;
