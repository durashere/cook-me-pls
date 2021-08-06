import PropTypes from 'prop-types';

import DefaultFooter from '@/layouts/default/components/DefaultFooter';
import DefaultHeader from '@/layouts/default/components/DefaultHeader';

const DefaultLayout = ({ children }) => {
  return (
    <div className="container flex flex-col items-center max-w-2xl min-h-screen gap-4 mx-auto">
      <DefaultHeader />
      <main className="flex-1 w-full p-4 overflow-y-auto">{children}</main>
      <DefaultFooter />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
