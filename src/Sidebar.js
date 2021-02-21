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
      this.state = {stateToggleState: false};
      this.darkState = 'Dark';
      this.position = '0px';
    }

    componentDidUpdate() {
      if (this.state.stateToggleState != this.props.toggleState) {
        console.log('intial update')
        this.setState({stateToggleState: this.props.toggleState});
        this.position = (this.state.stateToggleState) ? '0px' : '-93px';
      }

      if (this.props.darkMode == " ") {
        this.darkState = 'Dark';
      } else if(this.props.darkMode == "dark") {
        this.darkState =" Light"
      }
      
    }
  
    render(){   
      return (
        <div style={{left: this.position}} className={"sidebar "}>
          <ul  className="sidebar-list">
            <ListItem img={homeicon} txt={'Home'} link="/home"/>
            <ListItem img={ordericon} txt={'Orders'} link="/orders"/>
            <ListItem img={homeicon} txt={'Menus'} link="/menus"/>
            <ListItem img={homeicon} txt={'Settings'} link="/test"/> 
          </ul>
          <div className={"darkmode-button"}>
            <p onClick={this.props.darkMode}>{this.darkState} Mode</p>
          </div>
        </div>
      );
    }
  }

  export default Sidebar;