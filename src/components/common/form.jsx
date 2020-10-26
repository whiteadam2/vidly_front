import React, { Component } from "react";
import Input from "./input";
import DropDownList from "./dropDownList";

class Form extends Component {
  state = {
    data: {},
    errors: { initialState: "" },
  };

  schema = {};

  makeErrorsState = (validatedData) => {
    if (validatedData.error) {
      const totalErrors = validatedData.error.details.reduce((acc, detail) => {
        const path = detail.path[0];
        if (!acc.hasOwnProperty(path)) acc[path] = [];
        acc[path].push(detail.message);
        return acc;
      }, {});

      return totalErrors;
    }
    return {};
  };

  setErrorsState = () => {
    const result = this.schema.validate(this.state.data, { abortEarly: false });
    this.setState({ errors: this.makeErrorsState(result) });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };

  handleChange = ({ currentTarget: target }) => {
    this.setState(
      { data: { ...this.state.data, [target.id]: target.value } },
      () => this.setErrorsState()
    );
  };

  renderButton = (label) => {
    return (
      <button
        disabled={Object.keys(this.state.errors).length}
        className="btn btn-primary"
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, focused = false, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        focused={focused}
        type={type}
        label={label}
        id={name}
        errors={errors[name] || null}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderDropDownList = (name, label, options) => {
    const { errors, data } = this.state;

    return (
      <DropDownList
        label={label}
        name={name}
        options={options}
        value={data[name]}
        errors={errors[name] || null}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
