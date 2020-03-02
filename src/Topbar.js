import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import homeicon from './images/home icon.png';
import ordericon from './images/ordericon.png';  

class Topbar extends React.Component {
    render() {
        return(
            <div id="topbar">
                <p>Current User</p>
            </div>
        );
    }
}

export default Topbar;