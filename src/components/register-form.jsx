import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as UserService from "../services/user-service";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await UserService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
      console.log(response);
    } catch (e) {
      toast.error(e.message);
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
