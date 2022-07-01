import React, { Component } from "react";
import Home from "./Home/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Nav from "./res/Nav/Nav";
import CFstat from "./res/CFStat/CFStat";
class App extends Component{

  render(){
    return (
      <Router>
        <div className="App">
          <Nav></Nav>
          <Routes>
            <Route path = "/" element = {<Home></Home>} />
            <Route path="/profile" element = {<CFstat handles = {["Alfeh"]}></CFstat>} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
