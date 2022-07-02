import React from "react";
import { Component } from "react";
import logo from '../../Image/logo.svg'
import notification_icon from '../../Image/notification.svg'
import profile_icon from '../../Image/profile.svg'
import WavyText from "../WavyText/WavyText";
import './Nav.css'
import Axios from "axios";
class Nav extends Component{
    constructor(props){
        super(props);
    }


    //Temporary for testing
    loginreq = ()=>{
        console.log("requested");
        Axios.post("http://localhost:3001/registration").then((response) => {
            console.log(response);
        });
    }; 




    render(){
        return(
            <div className="Nav">
                <div className="lft">

                    <a className="btn" href = "/"><img src={logo}></img></a>
                    <a className="btn" href = "#"><WavyText>Contests</WavyText></a>
                    <a className="btn" href = "#"><WavyText>Users</WavyText></a>
                    <a className="btn" href = "#"><WavyText>Forum</WavyText></a>
                    <a className="btn" href = "cfviz"><WavyText>CFViz</WavyText></a>
                </div>
                <div className="rht">
                    <a className="btn" href = "/profile" ><img src={profile_icon}/></a> {/* Onclick temporary for testing purpose */}
                    <a className="btn" href = "#" onClick={this.loginreq}><img src = {notification_icon}/></a>
                </div>
            </div>
        );
    }
}
export default Nav;