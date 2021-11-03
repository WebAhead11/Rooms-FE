import React from "react";
import '../App.css';
import Navbar from "./Navbar";
import { Switch, Route} from "react-router-dom";
import RoomList from "./RoomList";
import Modal from "./Modal";
import UserList from "./UserList";
import HomePage from "./HomePage";

function App() {
    
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/user-list" component={UserList}></Route>
      </Switch>
    <Modal></Modal>
    </React.Fragment>
    
  );
}

export default App;
