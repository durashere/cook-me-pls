import { ReactElement } from 'react';

import DefaultFooter from '@/layouts/default/components/DefaultFooter';
import DefaultHeader from '@/layouts/default/components/DefaultHeader';

interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IDefaultLayout): ReactElement => (
  <div className="flex flex-col max-w-xl min-h-screen mx-auto">
    <DefaultHeader />
    <main className="flex-1 w-full p-4 overflow-y-auto">{children}</main>
    <DefaultFooter />
  </div>
);

export default DefaultLayout;
