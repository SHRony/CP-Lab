import React, { Component } from "react";
import "./Spinner.css"
class Spinner extends Component{
    constructor(props){
        super(props);
        
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
            <div className="Spinner">
                <span className="loader"></span>
            </div>
        )
    }
}
export default Spinner;