import { forwardRef } from 'react';
import classNames from 'classnames';

interface IButton {
  children?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'primary' | 'danger';
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    { children, disabled, fullWidth, htmlType = 'button', icon, onClick, type },
    ref
  ) => (
    <button
      className={classNames(
        'bg-transparent flex items-center justify-center p-2 transition-all rounded-md shadow outline-none focus:outline-none ring-1 hover:ring-2 whitespace-nowrap focus:ring',
        {
          'w-full': fullWidth,
          'text-gray-500 ring-gray-400 hover:ring-gray-400 focus:ring-gray-400':
            type === undefined,
          'text-yellow-500 ring-yellow-400 hover:ring-yellow-400 focus:ring-yellow-400':
            type === 'primary',
          'text-red-500 ring-red-400 hover:ring-red-400 focus:ring-red-400':
            type === 'danger',
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
        <span className={classNames('font-medium', { 'ml-2': icon })}>
          {children}
        </span>
      )}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;