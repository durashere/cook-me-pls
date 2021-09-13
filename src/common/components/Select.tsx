import { forwardRef } from 'react';
import classNames from 'classnames';

interface ISelect {
  defaultValue?: string | number;
  fullWidth?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string>;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
}

const Select = forwardRef<HTMLSelectElement, ISelect>(
  (
    {
      defaultValue,
      fullWidth,
      label,
      name,
      onChange,
      options,
      placeholder,
      required,
      value,
    },
    ref
  ) => (
    <div className={classNames({ 'w-full': fullWidth })}>
      {label && (
        <label htmlFor={name}>
          <span className="capitalize">{label}</span>
        </label>
      )}
      <select
        className={classNames('input', {
          'mt-1': label,
          'w-full': fullWidth,
        })}
        defaultValue={onChange ? undefined : defaultValue || ''}
        name={name}
        onChange={onChange}
        required={required}
        value={value}
        ref={ref}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
);

export default Select;
