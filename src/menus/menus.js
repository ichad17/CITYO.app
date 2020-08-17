import React from 'react';
import {Card, Button} from '../main.js'; 
import ViewMenu from './viewMenus.js'
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    useHistory,
    Link
  } from "react-router-dom";

const axios = require('axios').default;



class MenuAdd extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (  
            <div className="">
                    <Link to="menus/new-menu">
                        <Button style={{marginBottom: "1.0rem"}} id="new-menu">+ New Menu</Button>
                    </Link>                
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
        <div> 
        <MenuAdd/>
        <ViewMenu/>        
        </div>
      );
    }
}

export default Menus;