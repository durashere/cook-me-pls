import { Menu } from '@headlessui/react';
import classNames from 'classnames';
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
    <header className="sticky top-0 z-30 flex items-center justify-between w-full p-4 shadow bg-gray-100/50 backdrop-blur">
      <Link href="/" passHref>
        <div className="flex items-center gap-2 select-none">
          <div className="relative w-10 h-10">
            <Image
              alt="Picture of the chicken"
              layout="fill"
              objectFit="cover"
              priority
              src="/chicken.svg"
            />
          </div>
          <span className="text-4xl font-lobster">Cook me pls</span>
        </div>
      </Link>

      {sessionStatus === 'loading' && <Button className="w-10" isLoading />}

      {sessionStatus === 'unauthenticated' && (
        <Button isLoading={loginLoading} onClick={handleSignIn}>
          <div className="flex items-center gap-2">
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
          <Menu.Items className="absolute right-0 z-10 flex flex-col items-start w-56 p-2 mt-2 bg-white rounded-md shadow-xl outline-none focus:outline-none">
            <Menu.Item>
              {({ active }): ReactElement => (
                <button
                  type="button"
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-gray-500 outline-none focus:outline-none',
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
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-gray-500 outline-none focus:outline-none',
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
                  className={classNames(
                    'p-2 w-full flex items-center gap-2 rounded-md transition-all text-red-400 outline-none focus:outline-none',
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
