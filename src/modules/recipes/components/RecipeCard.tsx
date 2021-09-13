import Image from 'next/image';
import Link from 'next/link';

import { IRecipe } from '@/backend/models/recipe';

type IRecipeCard = Pick<
  IRecipe,
  '_id' | 'cookTime' | 'difficulty' | 'image' | 'name' | 'servings'
>;

const RecipeCard = ({
  _id,
  cookTime,
  difficulty,
  image,
  name,
  servings,
}: IRecipeCard): JSX.Element => (
  <Link href={`/recipes/${_id}`} passHref>
    <div className="relative overflow-hidden rounded-md shadow-md cursor-pointer group">
      <div className="relative transition-all duration-500 aspect-w-1 aspect-h-1 group-hover:scale-110">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="Picture of the dish"
        />
      </div>
      <div className="absolute bottom-0 w-full from-transparent to-black h-3/4 bg-gradient-to-b" />
      <div className="absolute w-full px-4 space-y-2 bottom-4">
        <h1 className="text-2xl font-bold text-center text-white/70 line-clamp-2">
          {name}
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          <h2 className="px-2 text-sm border rounded-md shadow border-white/50 text-white/50">
            {cookTime}
          </h2>
          <h2 className="px-2 text-sm border rounded-md shadow border-white/50 text-white/50">
            {servings} porcja
          </h2>
          <h2 className="px-2 text-sm border rounded-md shadow text-white/50 border-white/50">
            {difficulty}
          </h2>
        </div>
      </div>
    </div>
  </Link>
);

export default RecipeCard;
