import React from "react";
import '../App.css';
import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";
import RoomList from "./RoomList";

function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={RoomList}></Route>
        {/* <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route component={Default}></Route> */}
      </Switch>
    </React.Fragment>
  );
}

export default App;