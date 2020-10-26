import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import * as User from "../services/userService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { login: "", password: "", name: "" },
    errors: { initialState: "" },
  };

  schema = Joi.object({
    login: Joi.string().email().required(),
    password: Joi.string().trim().min(5).required(),
    name: Joi.string().trim().min(5).required(),
  });

  async doSubmit() {
    try {
      const result = await User.register(this.state.data);
      const token = result.headers["x-auth-token"];
      auth.saveJwt(token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("User already exist!");
      }
    }
  }

  render() {
    return (
      <div className="login-form">
        <h1>Register Form</h1>

        <form>
          {this.renderInput("login", "Login", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("name", "Your name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
