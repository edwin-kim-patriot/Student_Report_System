// client/src/components/common/Input/Input.jsx
import React from 'react';
import './Input.css';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;