import clsx from 'clsx';
import { forwardRef } from 'react';

interface IInput {
  defaultValue?: string | number;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  multiline?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  type?: string;
  value?: string | number;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      defaultValue,
      disabled,
      fullWidth,
      label,
      name,
      onChange,
      onClick,
      placeholder,
      readOnly,
      required,
      type = 'text',
      value,
    },
    ref
  ) => (
    <div className={clsx({ 'w-full': fullWidth })}>
      {label && (
        <label htmlFor={name}>
          <span className="capitalize">{label}</span>
        </label>
      )}
      <input
        className={clsx('block input', {
          'mt-1': label,
          'w-full': fullWidth,
        })}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={ref}
        required={required}
        type={type}
        value={value}
      />
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
