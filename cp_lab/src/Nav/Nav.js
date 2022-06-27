import React from "react";
import { Component } from "react";
import logo from './Image/logo.svg'
class Nav extends Component{
    render(){
        return(
            <div className="Nav">
                <div className="lft">

                    <a className="btn" href = "#"><img src={logo}></img></a>
                    <a className="btn" href = "#"></a>
                    <a className="btn" href = "#"></a>
                    <a className="btn" href = "#"></a>
                </div>
                <div className="rht">
                    <a className="btn" href = "#"></a>
                    <a className="btn" href = "#"></a>
                </div>
                

            </div>
        );
    }
}
export default Nav;