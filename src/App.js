import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Topbar from './Topbar.js';
import MainContent from './main.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App(props) {
  return (
    <div id="main">
      <Router>
        <Sidebar/>
        <Topbar/>
        <MainContent history={props.history}/>
      </Router>
    </div>
  );
}

export default App;
