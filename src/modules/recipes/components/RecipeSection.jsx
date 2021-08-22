import PropTypes from 'prop-types';

const Section = ({ children, label }) => {
  return (
    <div className="w-full space-y-2">
      {label && <h2 className="ml-4 text-2xl font-medium capitalize">{label}</h2>}
      <div className="p-4 space-y-4 bg-white rounded-md shadow">{children}</div>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
};

Section.defaultProps = {
  label: undefined,
};

export default Section;
