import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import homeicon from './images/home icon.png';
import ordericon from './images/ordericon.png';  

function MenuButton(props) {

    function handleClick() {
        console.log('!')
        console.log('stateclick');
        props.menuStateToggler();
    }

    return(
        <div onClick={handleClick} className={'menu-button'}>///</div>
    )
}

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stateToggleState: false};
    }

    componentDidUpdate() {
        if (this.state.stateToggleState != this.props.toggleState) {
          this.setState({stateToggleState: this.props.toggleState});
          this.padding = (this.state.stateToggleState) ? '120px' : '20px';
        }
    
      }

    toggledStateClass() {
        if (this.props.toggleState == true) {
            return 'inactive-toggle' 
        }

        return 'active-toggle'
    }

    render() {
        return(
            <div style={{paddingLeft: this.padding}} className={this.toggledStateClass}id="topbar">
                <MenuButton menuStateToggler={this.props.menuStateToggler}/>
                <div>
                    <p>Current User</p>
                </div>
            </div>
        );
    }
}

export default Topbar;