import React, { Component } from "react";
import RecommenderCard from "../res/RecommenderCard/RecommenderCard";
import "./Recommender.css"
import logo from "../Image/color_logo.svg"
class Recommender extends Component{
    constructor(props){
        super(props);
        this.inpRef = React.createRef();
        this.state = {
            handles : ['Raiden'],
            inpVal : "Raiden",
        }
    }
    submit = () => {
        if(this.inpRef.current.value.length != 0)
        this.setState({
            handles : this.inpRef.current.value.split(",")
        })
    }
    render(){
        return (
            <div className="Recommender">
                <div className="Recommender-top">
                    <div className="logo-container">
                        <img src={logo} className = "logo"></img>
                    </div>
                    <div className="Recommender-top-content">
                        <input type="text" ref={this.inpRef} value={this.state.inpVal} onChange={(e) => {this.setState({inpVal: e.target.value})}}></input>
                        <div onClick={this.submit}>submit</div>
                    </div>
                </div>
                <RecommenderCard handles = {this.state.handles}></RecommenderCard>
            </div>
        )
    }
}
export default Recommender;