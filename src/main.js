import React from 'react';
import Home from './home.js';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class Orders extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (  
        <div id="content">
          <p>Orders</p>
        </div>
      );
    }
}

class Menus extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (  
        <div id="content">
          <p>Menus</p>
        </div>
      );
    }
}

class MainContent extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (  
        <Switch>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/orders">
                <Orders />
            </Route>
            <Route path="/menus">
              <Menus />
            </Route>
        </Switch>
      );
    }
  }

export default MainContent;