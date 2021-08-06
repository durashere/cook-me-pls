import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  defaultValue,
  disabled,
  fullWidth,
  label,
  name,
  placeholder,
  register,
  required,
  type,
}) => {
  return (
    <div className={classNames({ 'w-full': fullWidth })}>
      {label && (
        <label htmlFor={name}>
          <span className="capitalize">{label}</span>
        </label>
      )}
      <input
        className={classNames('block input', {
          'mt-1': label,
          'w-full': fullWidth,
        })}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name, { required })}
      />
    </div>
  );
};

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  fullWidth: false,
  label: undefined,
  placeholder: undefined,
  required: false,
  type: 'text',
};

export default Input;
