import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { ReactElement, useState } from 'react';
import {
  MdOutlineListAlt,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlineMenu,
  MdOutlinePostAdd,
} from 'react-icons/md';

import Button from 'components/UI/Button';

const DefaultHeader = (): ReactElement => {
  const { push } = router;

  const [loginLoading, setLoginLoading] = useState(false);

  const { status: sessionStatus } = useSession();

  const handleSignIn = async (): Promise<void> => {
    setLoginLoading(true);
    await signIn('facebook');
  };

  const handleSignOut = (): Promise<void> => signOut();

  return (
    <header className="flex sticky top-0 z-30 justify-between items-center p-4 w-full bg-gray-100/50 shadow backdrop-blur">
      <Link href="/" passHref>
        <div className="flex gap-2 items-center select-none">
          <div className="relative w-10 h-10">
            <Image
              alt="Picture of the chicken"
              layout="fill"
              objectFit="cover"
              priority
              src="/chicken.svg"
            />
          </div>
          <span className="font-lobster text-4xl">Cook me pls</span>
        </div>
      </Link>

      {sessionStatus === 'loading' && <Button className="w-10" isLoading />}

      {sessionStatus === 'unauthenticated' && (
        <Button isLoading={loginLoading} onClick={handleSignIn}>
          <div className="flex gap-2 items-center">
            <span className="font-medium">Zaloguj</span>
            <MdOutlineLogin />
          </div>
        </Button>
      )}

      {sessionStatus === 'authenticated' && (
        <Menu as="div" className="w-10 h-10">
          <Menu.Button as={Button} className="w-10 h-10">
            <MdOutlineMenu className="absolute" />
          </Menu.Button>
          <Menu.Items className="flex absolute right-0 z-10 flex-col items-start p-2 mt-2 w-56 bg-white rounded-md outline-none focus:outline-none shadow-xl">
            <Menu.Item>
              {({ active }): ReactElement => (
                <button
                  type="button"
                  className={clsx(
                    'flex gap-2 items-center p-2 w-full text-gray-500 rounded-md outline-none focus:outline-none transition-all',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={(): Promise<boolean> => push(`/profile/my-recipes`)}
                >
                  <MdOutlineListAlt />
                  <span className="font-medium">Moje przepisy</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }): ReactElement => (
                <button
                  type="button"
                  className={clsx(
                    'flex gap-2 items-center p-2 w-full text-gray-500 rounded-md outline-none focus:outline-none transition-all',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={(): Promise<boolean> => push('/recipes/create')}
                >
                  <MdOutlinePostAdd />
                  <span className="font-medium">Dodaj przepis</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }): ReactElement => (
                <button
                  type="button"
                  className={clsx(
                    'flex gap-2 items-center p-2 w-full text-red-400 rounded-md outline-none focus:outline-none transition-all',
                    {
                      'bg-gray-100': active,
                    }
                  )}
                  onClick={handleSignOut}
                >
                  <MdOutlineLogout />
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
