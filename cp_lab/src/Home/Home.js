import React from "react";
import { Component } from "react";
import Nav from "../res/Nav/Nav";
import './Home.css'
import WavyText from "../res/WavyText/WavyText";
import BorderAnimation from "../res/BorderAnimation/BorderAnimation";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import Gallary from "../res/Gallary/Gallary";
import PieChart from "../res/Charts/PieChart/PieChart.js"
import CFstat from "../res/CFStat/CFStat";
class Home extends Component{
    render(){
        return(
            <div className="Home">
                <Nav></Nav>
                <div className="welcome-wrapper">
                    <div className="welcome">
                        <div className="welcome-lft">
                            <WavyText>WelcomeTo</WavyText>
                            <BorderAnimation>
                                <p className="CP">CP</p>
                                <p className="Lab">Lab</p>
                            </BorderAnimation>
                        </div>
                        <div className="welcome-rht">
                            <Gallary></Gallary>
                        </div>

                    </div>
                </div>
                <FadeScroll>
                    <div className="upcoming_contest">
                        <div className="ucLft">
                            <WavyText>UpcomingContests</WavyText>
                        </div>
                        <div className="ucRht">
                            <CFstat handles = {["Raiden"]}></CFstat>
                        </div>
                    </div>
                </FadeScroll>
                
            </div>
        );
    }
}
export default Home;