import React from 'react';
import Home from './home.js';
import Orders from './orders.js';
import Menus from './menus/menus.js';
import ViewMenu from './menus/viewMenus.js';
import EditMenuPage from './menus/editMenu.js';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link,
    withRouter
  } from "react-router-dom";
import NewMenu from './menus/newMenu.js';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div style={this.props.style} onClick={this.props.onClick} className={"button " + this.props.className}>
        <p>{this.props.children}</p>
      </div>
    );
  }
}

class AlertBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div style={this.props.style} className={"alertbox " +this.props.className}>
        <Card>
          <p>{this.props.children + " " + this.props.nameparams + "?"}</p>
          <br/>
          <div className="alertbuttons"><Button onClick={this.props.action} className="alert-button">{this.props.actionName}</Button><Button onClick={this.props.alertToggle}>Cancel</Button></div>
        </Card>
      </div>
    );
  }
}


class Card extends React.Component {

  constructor(props) {
      super(props);
      this.cardstyle = 'card';
      if (this.props.style) {
        this.cardstyle = props.style;
      }

      if(this.props.className) {
        this.cardstyle = 'card  ' + this.props.className;
      }
  }


  render() {
      return (
          <div id={this.props.id} className={this.cardstyle}>
              {this.props.children}
          </div>
      );
  }
}

function Title(props) {
  let location = useLocation();
  function parse(url) {
    
  }
  return (
    <h1>{location.pathname}</h1> 
  );
}

class MainContentSet extends React.Component {

    constructor(props) {
      super(props);
      this.state = {stateToggleState: false};
    }

    componentDidUpdate() {
      if (this.state.stateToggleState != this.props.toggleState) {
        console.log(this.props.toggleState, this.state.stateToggleState)
        this.position = (this.state.stateToggleState) ? '100px' : '0px';
        this.width = (this.state.stateToggleState) ? '100px':'0px';
        this.setState({stateToggleState: this.props.toggleState});
        console.log(this.state.stateToggleState);
      }
      
    }
    
    render() {
      return (
      <div style={{width: `calc(100% - ${this.width})`, left: this.position}}id="content"> 
        <Title/>
        <Switch>
            /* home */ 
            <Route path="/home">
                <Home />
            </Route>

            /* order routes */
            <Route path="/orders">
                <Orders />
            </Route>

            /* menu routes */
            <Route exact path="/menus">
                <Menus/>
            </Route>
            <Route path="/menus/new-menu">
                <NewMenu/>
            </Route>
            <Route path="/menus/view-menus">
                <ViewMenu/>
            </Route>
            <Route path="/menus/edit/:menuid" component={EditMenuPage}/>
        </Switch>
      </div>
      );  
    }
  }

  const MainContent = withRouter(MainContentSet);

export default MainContent;
export {Card, Button, AlertBox}