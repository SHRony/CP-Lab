import React from "react";
import { Component } from "react";
import logo from "../../Image/color_logo.svg"
import "./HomeMenu.css";
import triangle from "../../Image/triangle.svg"
import cfviz_icon from "../../Image/cfviz.svg"
import users_icon from "../../Image/users.svg"
import forum_icon from "../../Image/forum.svg"
import contests_icon from "../../Image/contests.svg"
import recomendation_icon from "../../Image/recomendation.svg"
class HomeMenu extends Component {
  render() {
    return (
      <div className="HomeMenu">
        <div className="home-menu-lft">
            <div className="color-logo"><img src={logo}></img></div>
            <div className="home-menu-heading">
                CP Lab
            </div>
            <div className="home-menu-description">
                Welcome to CP Lab, a web application designed specifically for the competitive programming community at our university. 
                This app is your one-stop solution for all your competitive programming needs.

                With CP Lab, you'll have access to a comprehensive set of features, including:

                <ul>
                    <li>Forum: A platform for discussions, Q&A, and sharing ideas with fellow programmers.</li>

                    <li>Team Management: A tool for managing team assignments, tracking progress, and collaborating with teammates.</li>

                    <li>Individual Progress Visualization: A visual representation of your progress over time, with charts and graphs to help you stay motivated and on track.</li>

                    <li>Problem Recommendation: A tool for recommending new problems based on your skill level, interests, and past performance.</li>
                </ul>

                With these features and more, CP Lab is the ultimate resource for competitive programmers. Join our community today and take your skills to the next level!
            </div>
        </div>
        <div className="home-menu-rht">
            <div className="home-menu-btn">
                <div className = "menu-btn-text">Problem Recommendation</div>
                <div className="home-menu-icon-container">
                    <img className="home-menu-bg" src={triangle}></img>
                    <div className="home-menu-rect"><img src={recomendation_icon}></img></div>
                </div>
            </div>
            <div className="home-menu-btn">
                <div className = "menu-btn-text">CF Visualization</div>
                <div className="home-menu-icon-container">
                    <img className="home-menu-bg" src={triangle}></img>
                    <div className="home-menu-rect"><img src={cfviz_icon}></img></div>
                </div>
            </div>
            <div className="home-menu-btn">
                <div className = "menu-btn-text">Contests</div>
                <div className="home-menu-icon-container">
                    <img className="home-menu-bg" src={triangle}></img>
                    <div className="home-menu-rect"><img src={contests_icon}></img></div>
                </div>
            </div>
            <div className="home-menu-btn">
                <div className = "menu-btn-text">Forum</div>
                <div className="home-menu-icon-container">
                    <img className="home-menu-bg" src={triangle}></img>
                    <div className="home-menu-rect"><img src={forum_icon}></img></div>
                </div>
            </div>
            <div className="home-menu-btn">
                <div className = "menu-btn-text">Users</div>
                <div className="home-menu-icon-container">
                    <img className="home-menu-bg" src={triangle}></img>
                    <div className="home-menu-rect"><img src={users_icon}></img></div>
                </div>
            </div>
        </div>

      </div>
    );
  }
}
export default HomeMenu;
