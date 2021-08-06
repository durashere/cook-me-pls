import PropTypes from 'prop-types';

const Section = ({ children, label }) => {
  return (
    <div className="space-y-2">
      <h2 className="ml-4 text-2xl font-medium capitalize">{label}</h2>
      <div className="p-4 space-y-4 bg-white rounded-md shadow-sm">{children}</div>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default Section;
