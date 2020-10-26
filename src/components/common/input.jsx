import React from "react";

const Input = ({ label, focused, errors, id, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>Enter {label}</label>
      <input {...rest} id={id} autoFocus={focused} className="form-control" />
      {errors &&
        errors.map((error) => (
          <div key={error} className="validation">
            {error}
          </div>
        ))}
    </div>
  );
};

export default Input;
