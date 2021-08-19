import { signIn, signOut, useSession } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';

const DefaultHeader = () => {
  const [session, loading] = useSession();

  return (
    <header className="relative flex items-center justify-between w-full p-4">
      <Link href="/">
        <div className="flex items-center gap-2 select-none">
          <div className="relative w-10 h-10">
            <Image
              src="/chicken.svg"
              layout="fill"
              objectFit="cover"
              alt="Picture of the chicken"
            />
          </div>
          <span className="text-4xl font-lobster">Cook me pls</span>
        </div>
      </Link>

      {!loading && !session && <Button onClick={() => signIn('facebook')}>Zaloguj</Button>}

      {!loading && session && (
        <Button onClick={() => signOut()}>
          <div className="relative w-10 h-10 -m-2 overflow-hidden rounded-md">
            <Image
              src={session.user.image}
              layout="fill"
              objectFit="cover"
              alt="User avatar"
              unoptimized
            />
          </div>
        </Button>
      )}
    </header>
  );
};

export default DefaultHeader;
