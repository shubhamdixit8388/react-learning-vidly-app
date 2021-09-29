import React from "react";
import Input from "./common/input";

class LoginForm extends React.Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length) {
      console.log(errors);
    } else {
      console.log("Submitted");
    }
    this.setState({ errors });
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required";
    }
    return errors;
  };

  validateProperty = ({ value, name }) => {
    if ((name === "username" || name === "password") && value.trim() === "") {
      return name === "username"
        ? "Username is required"
        : "Password is required";
    }
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
