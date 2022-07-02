import React, { Component } from "react";
import Home from "./Home/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Nav from "./res/Nav/Nav";
import CFstat from "./res/CFStat/CFStat";
import Registratration from "./Registration/Registration";
import CFViz from "./CFViz/CFViz";
class App extends Component{

  render(){
    return (
      <Router>
        <div className="App">
          <Nav></Nav>
          <Routes>
            <Route path = "/" element = {<Home></Home>} />
            <Route path="/profile" element = {<CFstat handles = {["Raiden"]}></CFstat>} />
            <Route path="/registration" element = {<Registratration></Registratration>} />
            <Route path="/cfviz" element = {<CFViz></CFViz>} />

          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
