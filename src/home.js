import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  class Card extends React.Component {
      constructor(props) {
          super(props);

      }

      render() {
          return (
              <div id={this.props.id} className="card">
                  {this.props.children}
              </div>
          );
      }
  }

  class Home extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return ( 
        <div id="content">
            <h1>Home</h1>
            <div className="grid-container">
                <Card id="orders">
                    <h2>Orders</h2>
                    <div className="item">
                        <p>This is an example of some orders</p>
                        <p>This is an example of some orders</p>
                    </div>
                    <div className="item">
                        <p>This is an example of some orders</p>
                        <p>This is an example of some orders</p>
                    </div>
                </Card>
                <Card id="menus">
                    <h2>Menus</h2>
                    <p className="item">This is an example of a menu</p>
                    <p className="item">This is an example of a menu</p>
                </Card>
                <Card id="payments">
                    <h2>Orders</h2>
                </Card>
            </div>
        </div>
      );
    }
  }

  export default Home;