import React from 'react';
import {
    BrowserRouter as Router,
    NavLink
  } from "react-router-dom";
import homeicon from './images/home icon.png';
import ordericon from './images/ordericon.png';  

class ListItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {isActive: false};
    }
    
    render() {
        return (
            <li>
                <NavLink to={this.props.link} activeClassName="selected"><span className="icon"><img src={this.props.img}/></span>
                <span>{this.props.txt}</span></NavLink>
            </li>
        );
    }
}

class Sidebar extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render(){   
      return (
        <div className="sidebar">
          <ul className="sidebar-list">
            <ListItem img={homeicon} txt={'Home'} link="/home"/>
            <ListItem img={ordericon} txt={'Orders'} link="/orders"/>
            <ListItem img={homeicon} txt={'Menus'} link="/menus"/>
            <ListItem img={homeicon} txt={'Settings'} link="/test"/> 
          </ul>
        </div>
      );
    }
  }

  export default Sidebar;