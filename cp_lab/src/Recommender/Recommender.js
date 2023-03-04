import React, { Component } from "react";
import RecommenderCard from "../res/RecommenderCard/RecommenderCard";
import "./Recommender.css"
class Recommender extends Component{
    constructor(props){
        super(props);
        this.inpRef = React.createRef();
        this.state = {
            handles : [],
        }
    }
    submit = () => {
        if(this.inpRef.current.value.length != 0)
        this.setState({
            handles : this.inpRef.current.value.split(",")
        })
        console.log(this.state);
    }
    render(){
        return (
            <div className="Recommender">
                <div className="Recommender-top">
                    <input type="text" ref={this.inpRef}></input>
                    <div onClick={this.submit}>submit</div>
                </div>
                {/* <RecommenderCard handles = {['Raiden']}></RecommenderCard> */}
                <RecommenderCard handles = {this.state.handles}></RecommenderCard>
            </div>
        )
    }
}
export default Recommender;