import Image from 'next/image';
import Link from 'next/link';

import { IUser } from '@/backend/models/user';

type IRecipeAuthor = Pick<IUser, '_id' | 'image' | 'name'>;

const RecipeAuthor = ({ _id, image, name }: IRecipeAuthor): JSX.Element => (
  <div className="flex items-center justify-center">
    <Link href={`/users/${_id}/recipes`} passHref>
      <div className="flex items-center cursor-pointer">
        <div className="relative w-6 h-6 overflow-hidden rounded-md">
          <Image
            src={image as string}
            layout="fill"
            objectFit="cover"
            alt="User avatar"
          />
        </div>
        <p className="ml-2 text-lg">{name}</p>
        <span className="material-icons-outlined">chevron_right</span>
      </div>
    </Link>
  </div>
);

export default RecipeAuthor;
