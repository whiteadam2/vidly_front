import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { login: "", password: "" },
    errors: { initialState: "" },
  };

  schema = Joi.object({
    login: Joi.string().trim().min(3).email().required(),
    password: Joi.string().trim().min(6).required(),
  });

  async doSubmit() {
    const { login, password } = this.state.data;
    const { state: locationState } = this.props.location;

    try {
      await auth.login(login, password);
      window.location = locationState ? locationState.referrer.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="login-form">
        <h1>Login Form</h1>

        <form>
          {this.renderInput("login", "Login", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
