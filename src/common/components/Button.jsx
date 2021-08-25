import { forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = forwardRef(
  ({ children, disabled, fullWidth, htmlType, icon, onClick, type }, ref) => {
    return (
      <button
        className={classNames(
          'bg-transparent flex items-center justify-center p-2 transition-all rounded-md shadow outline-none focus:outline-none ring-1 hover:ring-2 whitespace-nowrap focus:ring',
          {
            'w-full': fullWidth,
            'text-gray-500 ring-gray-400 hover:ring-gray-400 focus:ring-gray-400':
              type === undefined,
            'text-yellow-500 ring-yellow-400 hover:ring-yellow-400 focus:ring-yellow-400':
              type === 'primary',
            'text-red-500 ring-red-400 hover:ring-red-400 focus:ring-red-400': type === 'danger',
          }
        )}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={htmlType}
      >
        {icon && <span className="material-icons-outlined">{icon}</span>}
        {children && (
          <span className={classNames('font-medium', { 'ml-2': icon })}>{children}</span>
        )}
      </button>
    );
  }
);

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
  type: undefined,
};

export default Button;
