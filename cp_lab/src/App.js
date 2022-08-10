import React, { Component } from "react";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./res/Nav/Nav";
import CFstat from "./res/CFStat/CFStat";
import Registratration from "./Registration/Registration";
import CFViz from "./CFViz/CFViz";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route
              path="/registration"
              element={<Registratration></Registratration>}
            />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/cfviz" element={<CFViz></CFViz>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
