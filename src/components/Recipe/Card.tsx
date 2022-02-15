import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import { IRecipe } from 'backend/models/recipe';

interface IRecipeCard {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { _id, cookTime, difficulty, image, name, servings },
}: IRecipeCard): ReactElement {
  return (
    <Link href={`/recipes/${_id}`} passHref>
      <div className="group overflow-hidden relative rounded-md shadow-md cursor-pointer">
        <div className="aspect-square relative transition-all duration-500 group-hover:scale-110">
          <Image
            alt="Picture of the dish"
            layout="fill"
            objectFit="cover"
            priority
            src={image || '/image-placeholder.png'}
          />
        </div>
        <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-b from-transparent to-black" />
        <div className="absolute bottom-4 px-4 space-y-2 w-full">
          <h1 className="text-2xl font-bold text-center text-white/70 line-clamp-2">
            {name}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <h2 className="px-2 text-sm text-white/50 rounded-md border border-white/50 shadow">
              {cookTime}
            </h2>
            <h2 className="px-2 text-sm text-white/50 rounded-md border border-white/50 shadow">
              {servings} porcja
            </h2>
            <h2 className="px-2 text-sm text-white/50 rounded-md border border-white/50 shadow">
              {difficulty}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
