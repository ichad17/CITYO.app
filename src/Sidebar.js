import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import homeicon from './images/home icon.png';
import ordericon from './images/ordericon.png';  

function ListItem(props) {
    return (
        <li>
          <Link to={props.link}><span className="icon"><img src={props.img}/></span></Link>
          <Link to={props.link}><span>{props.txt}</span></Link>
        </li>
    );
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
            <ListItem img={homeicon} txt={'Settings'}/> 
          </ul>
        </div>
      );
    }
  }

  export default Sidebar;