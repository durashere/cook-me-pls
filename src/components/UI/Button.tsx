import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface IButton extends ComponentPropsWithoutRef<'button'> {
  disabled?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  variant?: 'solid' | 'outline' | 'ghost';
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isFullWidth,
      isLoading,
      variant = 'outline',
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        type="button"
        disabled={disabled}
        className={classNames(
          'inline-flex items-center justify-center px-4 h-10 font-semibold rounded-md',
          'focus:outline-none focus-visible:ring focus-visible:ring-gray-400',
          'transition-colors duration-300',
          'shadow',
          isFullWidth && 'w-full',
          [
            variant === 'solid' && [
              'bg-gray-500 text-white',
              'hover:bg-gray-600 hover:text-white',
              'active:bg-gray-500',
              'disabled:bg-gray-400 disabled:hover:bg-gray-400',
            ],
            variant === 'outline' && [
              'text-gray-500',
              'border border-gray-500',
              'hover:bg-gray-50',
              'active:bg-gray-100',
              'disabled:bg-gray-100',
            ],
            variant === 'ghost' && [
              'text-gray-500',
              'shadow-none',
              'hover:bg-gray-50',
              'active:bg-gray-100',
              'disabled:bg-gray-100',
            ],
          ],
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative !text-transparent hover:!text-transparent !cursor-wait !transition-none',
          className
        )}
        ref={ref}
        {...rest}
      >
        {isLoading && (
          <div
            className={classNames(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': variant === 'solid',
                'text-gray-500': variant !== 'solid',
              }
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
