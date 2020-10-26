import React from "react";

const DropDownList = ({
  name,
  label,
  options,
  errors,
  value,
  textProperty,
  valueProperty,
  onChange,
}) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>Select {label}</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend"></div>
        <select
          onChange={onChange}
          id={name}
          value={value}
          className="custom-select"
        >
          {options.map((option) => (
            <option key={option[valueProperty]} value={option[valueProperty]}>
              {option[textProperty]}
            </option>
          ))}
        </select>

        {errors &&
          errors.map((error) => (
            <div key={error} className="validation">
              {error}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

DropDownList.defaultProps = {
  textProperty: "title",
  valueProperty: "_id",
};

export default DropDownList;
