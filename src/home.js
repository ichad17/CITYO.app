import React from 'react';
import {Card, Button} from './main.js';
import {Orderitem} from './orders.js';
import {MenuItem} from './menus/viewMenus.js';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,          
    Link
  } from "react-router-dom";

  class Home extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return ( 
        <div className="grid-container">
            <Card id="orders">
                <h2>Orders</h2>
                <Orderitem/>
                <Orderitem/>
            </Card>
            <Card id="menus">
                <h2>Menus</h2>
                <MenuItem/>
            </Card>
            <Card id="payments">
                <h2>Orders</h2>
            </Card>
        </div>
      );
    }
  }

  export default Home;