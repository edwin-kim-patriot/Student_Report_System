// client/src/components/common/Select/Select.jsx
import React from 'react';
import './Select.css';

const Select = ({ label, name, value, onChange, options, error, ...props }) => {
  return (
    <div className="select-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Select;