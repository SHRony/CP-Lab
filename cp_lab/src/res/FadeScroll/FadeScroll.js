import React, { Component, useReducer, useRef, useEffect } from "react";
import './FadeScroll.css'
class FadeScroll extends Component{
    state = {
        isVisible : false
    }
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount(){
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            let visibility = entry.isIntersecting | this.state.isVisible;
            console.log(this.state.isVisible);
            this.setState({
                // isVisible :  (this.state.isVisible? this.state.isVisible : entry.isIntersecting)
                isVisible : visibility
            })
        } , [])
        observer.observe(this.myRef.current);
        
    }
    render(){
        return (
            <div className= {this.state.isVisible ? "FadeScroll fadeIn" : "FadeScroll fadeOut"} ref = {this.myRef}>
                {
                    this.props.children
                }
            </div>
        )
    }
}
export default FadeScroll;