import { Menu } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';

import Button from '@/components/Button';
import Loader from '@/components/Loader';

const DefaultHeader = () => {
  const { push } = router;

  const [loginLoading, setLoginLoading] = useState(false);

  const [session, loading] = useSession();

  const handleSignIn = async () => {
    setLoginLoading(true);
    await signIn('facebook');
  };

  const handleSignOut = () => signOut();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between w-full p-4 shadow bg-white-100/20 backdrop-blur-md">
      <Link href="/">
        <div className="flex items-center gap-2 select-none">
          <div className="relative w-10 h-10">
            <Image
              alt="Picture of the chicken"
              layout="fill"
              objectFit="cover"
              src="/chicken.svg"
            />
          </div>
          <span className="text-4xl font-lobster">Cook me pls</span>
        </div>
      </Link>

      {!loading && !session && (
        <Button onClick={handleSignIn}>
          <div className="flex items-center gap-2">
            <span className="font-medium">Zaloguj</span>
            {loginLoading ? (
              <Loader className="w-6 h-6" />
            ) : (
              <span className="material-icons-outlined">login</span>
            )}
          </div>
        </Button>
      )}

      {!loading && session && (
        <Menu as="div" className="relative">
          <Menu.Button as={Button}>
            <div className="relative w-10 h-10 -m-2 overflow-hidden rounded-md">
              <Image src={session.user.image} layout="fill" objectFit="cover" alt="User avatar" />
            </div>
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-10 flex flex-col items-start w-56 p-2 mt-2 bg-white rounded-md shadow-xl outline-none focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-gray-500 outline-none focus:outline-none',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={() => push('#')}
                >
                  <span className="material-icons-outlined">library_books</span>
                  <span className="font-medium">Moje przepisy</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-gray-500 outline-none focus:outline-none',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={() => push('/recipes/create')}
                >
                  <span className="material-icons-outlined">post_add</span>
                  <span className="font-medium">Dodaj przepis</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-gray-500 outline-none focus:outline-none',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={() => push('/ingredients')}
                >
                  <span className="material-icons-outlined">tune</span>
                  <span className="font-medium">Składniki</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-red-400 outline-none focus:outline-none',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={handleSignOut}
                >
                  <span className="text-red-400 material-icons-outlined">logout</span>
                  <span className="font-medium">Wyloguj</span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </header>
  );
};

export default DefaultHeader;
