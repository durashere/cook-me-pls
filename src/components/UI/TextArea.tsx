import classNames from 'classnames';
import { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ITextArea {
  defaultValue?: string | number;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  placeholder?: string;
  readOnly?: boolean;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  rows?: number;
  value?: string | number;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
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
      rows = 5,
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
      <textarea
        className={classNames('block input', {
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
        rows={rows}
        value={value}
      />
    </div>
  )
);

export default TextArea;
