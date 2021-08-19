import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ children, disabled, fullWidth, htmlType, icon, onClick, type }) => {
  return (
    <button
      className={classNames(
        'bg-transparent flex items-center justify-center p-2 transition-all rounded-md shadow-sm outline-none focus:outline-none ring-1 hover:ring whitespace-nowrap focus:ring',
        {
          'w-full': fullWidth,
          'text-gray-500 ring-gray-300 hover:ring-gray-400/50 focus:ring-gray-400/50':
            type === 'default',
          'text-yellow-500 ring-yellow-500 hover:ring-yellow-500/50 focus:ring-yellow-500/50':
            type === 'primary',
          'text-red-500 ring-red-500 hover:ring-red-500/50 focus:ring-red-500/50':
            type === 'danger',
        }
      )}
      disabled={disabled}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
    >
      {icon && <span className="material-icons-outlined">{icon}</span>}
      {children && <span className={classNames('font-medium', { 'ml-2': icon })}>{children}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  htmlType: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  children: undefined,
  disabled: false,
  fullWidth: false,
  htmlType: 'button',
  icon: undefined,
  onClick: undefined,
  type: 'default',
};

export default Button;
