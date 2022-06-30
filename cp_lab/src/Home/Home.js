import React from "react";
import { Component } from "react";
import Nav from "../Nav/Nav";
import './Home.css'
import homeimage from '../Image/home.svg'
import WavyText from "../res/WavyText/WavyText";
import BorderAnimation from "../res/BorderAnimation/BorderAnimation";
import FadeScroll from "../res/FadeScroll/FadeScroll";
import contestIllustration from "../Image/contestIllustration.svg"
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
                            <img src={homeimage}/>
                        </div>

                    </div>
                </div>
                <FadeScroll>
                    <div className="upcoming_contest">
                        <div className="ucLft">
                            <WavyText>UpcomingContests</WavyText>
                        </div>
                        <div className="ucRht">
                            
                        </div>
                    </div>
                </FadeScroll>
                
            </div>
        );
    }
}
export default Home;