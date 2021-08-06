import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Select = ({ required, register, options, name, label, fullWidth, defaultValue }) => (
  <div className={classNames({ 'w-full': fullWidth })}>
    {label && (
      <label htmlFor={name}>
        <span className="capitalize">{label}</span>
      </label>
    )}
    <select
      className={classNames('input', { 'mt-1': label, 'w-full': fullWidth })}
      defaultValue={defaultValue}
      name={name}
      required={required}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(name, { required })}
    >
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
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

Select.defaultProps = {
  defaultValue: undefined,
  fullWidth: false,
  label: undefined,
  required: false,
};

export default Select;
