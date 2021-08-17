import { signIn, signOut, useSession } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';

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

      {!loading && !session && (
        <>
          <button className="button" type="button" onClick={() => signIn('facebook')}>
            Zaloguj
          </button>
        </>
      )}

      {!loading && session && (
        <>
          <button className="p-0 overflow-hidden button" type="button" onClick={() => signOut()}>
            <div className="relative w-10 h-10">
              <Image
                src={session.user.image}
                layout="fill"
                objectFit="cover"
                alt="User avatar"
                unoptimized
              />
            </div>
            <span className="hidden mx-2 font-medium sm:block">{session.user.name}</span>
          </button>
        </>
      )}
    </header>
  );
};

export default DefaultHeader;
