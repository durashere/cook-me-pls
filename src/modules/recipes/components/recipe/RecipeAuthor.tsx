import { MdOutlineChevronRight } from 'react-icons/md';
import { ReactElement } from 'react';
import Link from 'next/link';

import useUser from '@/modules/users/hooks/useUser';

interface IRecipeAuthor {
  authorId: string;
}

const RecipeAuthor = ({ authorId }: IRecipeAuthor): ReactElement => {
  const { data: author } = useUser(authorId);

  return (
    <div className="flex items-center justify-center">
      <Link href={`/users/${authorId}/recipes`} passHref>
        <div className="flex items-center cursor-pointer">
          <p className="text-lg">
            <span className="text-base text-gray-400">Więcej od: </span>
            {author?.name}
          </p>
          <MdOutlineChevronRight />
        </div>
      </Link>
    </div>
  );
};

export default RecipeAuthor;
