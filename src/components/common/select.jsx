import React from "react";

const Select = ({
  name,
  label,
  options,
  error,
  labelProperty,
  valueProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} className="form-control" id={name} {...rest}>
        {options.map((option) => (
          <option value={option[valueProperty]} key={option[valueProperty]}>
            {option[labelProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
