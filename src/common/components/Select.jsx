import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Select = ({
  defaultValue,
  fullWidth,
  label,
  name,
  options,
  placeholder,
  register,
  required,
}) => (
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
      defaultValue={defaultValue || ''}
      name={name}
      required={required}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(name, { required })}
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

Select.propTypes = {
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

Select.defaultProps = {
  defaultValue: undefined,
  fullWidth: false,
  label: undefined,
  placeholder: undefined,
  required: false,
};

export default Select;
