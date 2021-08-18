import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Select = ({
  defaultValue,
  fullWidth,
  label,
  name,
  onChange,
  options,
  placeholder,
  register,
  required,
  value,
}) => {
  const registerProps = register && { ...register(name, { required }) };

  return (
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...registerProps}
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
  );
};

Select.propTypes = {
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Select.defaultProps = {
  defaultValue: undefined,
  fullWidth: false,
  label: undefined,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  register: undefined,
  required: false,
  value: undefined,
};

export default Select;
