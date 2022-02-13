import { ReactElement } from 'react';

import DefaultFooter from 'components/Layout/Footer';
import DefaultHeader from 'components/Layout/Header';

interface IDefaultLayout {
  children: React.ReactNode;
}

const Layout = ({ children }: IDefaultLayout): ReactElement => (
  <div className="flex flex-col mx-auto max-w-xl min-h-screen">
    <DefaultHeader />
    <main className="overflow-y-auto flex-1 p-4 w-full">{children}</main>
    <DefaultFooter />
  </div>
);

export default Layout;
