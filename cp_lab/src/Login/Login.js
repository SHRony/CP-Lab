import React, { Component } from "react";
import Form from "../res/Form/Form";
import WavyText from "../res/WavyText/WavyText";
import "./Login.css";
import Axios from "axios";
import { storeData, getData, isLoggedIn } from "../helper";
import { Navigate } from "react-router-dom";
import logo from "../Image/color_logo.svg"
class Login extends Component {
  constructor(props) {
    super(props);
    this.usernameInp = React.createRef();
    this.passwordInp = React.createRef();
    this.state = {
      isLoggedIn: 0,
    };
  }
  loginReq = (user) => {
    console.log("requested");
    Axios.post("http://localhost:3001/login", user).then((response) => {
      if (response.data === 1) {
        this.usernameInp.current.setCustomValidity("User not found");
        this.usernameInp.current.reportValidity();
      } else if (response.data === 2) {
        this.passwordInp.current.setCustomValidity("Incorrect password");
        this.passwordInp.current.reportValidity();
      } else if (response.data === 3) {
        alert("Error connecting database, try again");
      } else {
        storeData("current_user", response.data);
        window.location.reload(false);
        console.log(response.data);
      }
    });
  };
  submit = () => {
    let user = {
      userName: this.usernameInp.current.value,
      password: this.passwordInp.current.value,
    };
    this.loginReq(user);
  };
  componentDidMount() {
    isLoggedIn().then((res) => {
      console.log(res);
      if (res === 1) {
        this.setState({
          isLoggedIn: -1,
        });
      } else {
        this.setState({
          isLoggedIn: 1,
        });
      }
    });
  }

  render() {
    console.log(this.state);
    let content = (
      <div className="Login">
        <Form>
          <div className="form-rht">
          <div className="form-logo"><img src={logo}></img></div>
          <div className="form-heading">Log In</div>
            <input
              className="inp"
              name="username"
              placeholder="User Name"
              type="text"
              ref={this.usernameInp}
              onChange={this.checkUsername}
            />
            <span></span>

            <input
              className="inp"
              name="password"
              type="password"
              placeholder="password"
              ref={this.passwordInp}
              onChange={this.checkPassword}
            />
            <span></span>
            <div className="submit_container">
              <div className="submit" onClick={this.submit}>
                Log In
              </div>
            </div>
            <div className="form-alternate">Don't have an Account? <a href="registration">Create new</a></div>
          </div>
        </Form>
      </div>
    );
    console.log(this.state.isLoggedIn);
    if (this.state.isLoggedIn === 1) content = <Navigate to="/" />;
    else if (this.state.isLoggedIn === 0) content = "";
    return content;
  }
}
export default Login;
