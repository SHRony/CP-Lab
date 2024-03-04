import React from "react";
import { Component } from "react";
import logo from "../../Image/logo.svg";
import notification_icon from "../../Image/notification.svg";
import profile_icon from "../../Image/profile.svg";
import logout_icon from "../../Image/logout_white.png";
import WavyText from "../WavyText/WavyText";
import "./Nav.css";
import Axios from "axios";
import { eraseData, isLoggedIn } from "../../helper";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: 0,
    };
  }

  //Temporary for testing
  logoutreq = () => {
    eraseData("current_user");
    window.location.reload(false);
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
    let rht = <div className="rht"></div>;
    if (this.state.isLoggedIn === 1)
      rht = (
        <div className="rht">
          <a className="btn" href="/profile">
            <img src={profile_icon} />
          </a>{" "}
          <a className="btn" href="#" onClick={this.logoutreq}>
            <img src={logout_icon} />
          </a>
        </div>
      );
    else if (this.state.isLoggedIn === -1)
      rht = (
        <div className="rht">
          <a className="btn" href="/login">
            <WavyText>Sign In</WavyText>
          </a>
          <a className="btn" href="/registration" onClick={this.logoutreq}>
            <WavyText>Sign Up</WavyText>
          </a>
        </div>
      );
    return (
      <div className="Nav">
        <div className="lft">
          <a className="btn" href="/">
            <img src={logo}></img>
          </a>
          <a className="btn" href="contests">
            Contests
          </a>
          <a className="btn" href="users">
            Users
          </a>
          <a className="btn" href="forum">
            Forum
          </a>
          <a className="btn" href="cfviz">
            CFViz
          </a>
          <a className="btn" href="recommender">
            Recommender
          </a>
        </div>
        {rht}
      </div>
    );
  }
}
export default Nav;
