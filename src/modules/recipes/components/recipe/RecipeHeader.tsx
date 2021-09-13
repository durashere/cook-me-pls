import Image from 'next/image';

import { IRecipe } from '@/backend/models/recipe';

type IRecipeHeader = Pick<IRecipe, 'image' | 'name'>;

const RecipeHeader = ({
  image = '/image-placeholder.png',
  name,
}: IRecipeHeader): JSX.Element => (
  <div className="space-y-4">
    <div className="relative overflow-hidden rounded-md shadow-md">
      <div className="relative aspect-w-1 aspect-h-1">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="Picture of the dish"
        />
      </div>
    </div>
    <h1 className="px-4 text-2xl font-bold text-center">{name}</h1>
  </div>
);

export default RecipeHeader;
