import PropTypes from 'prop-types';

import DefaultFooter from '@/layouts/default/components/DefaultFooter';
import DefaultHeader from '@/layouts/default/components/DefaultHeader';

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col max-w-xl min-h-screen mx-auto">
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
