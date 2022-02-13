import { ReactElement } from 'react';

import DefaultFooter from 'components/Layout/Footer';
import DefaultHeader from 'components/Layout/Header';

interface IDefaultLayout {
  children: React.ReactNode;
}

const Layout = ({ children }: IDefaultLayout): ReactElement => (
  <div className="flex flex-col max-w-xl min-h-screen mx-auto">
    <DefaultHeader />
    <main className="flex-1 w-full p-4 overflow-y-auto">{children}</main>
    <DefaultFooter />
  </div>
);

export default Layout;
