import React from "react";

const FormInput = ({ name, type, value, handleChange, labelText }) => {
  return (
    <div>
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
