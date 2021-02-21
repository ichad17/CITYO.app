import React, {useState} from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import LoginScreen from './login/login.js'
import Topbar from './Topbar.js';
import MainContent from './main.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App(props) {
  const [toggleMenuState, setToggleState] = useState(false); 
  const [darkMode, setDarkMode] = useState(" ");
  const [isLoggedIn, setLoggedStatus] = useState(false);
  
  const menuStateToggler = () => {
    if (toggleMenuState == false) {
      return setToggleState(true);
    }
    setToggleState(false)
    console.log(toggleMenuState);
  }

  const darkModeToggler = () => {
    if (darkMode == " ") {
      return setDarkMode("dark");
    }

    return setDarkMode(" ")
  }

  if (isLoggedIn == true) {

    return (
      <div className={darkMode}id="main">
        <Router>
          <Sidebar darkMode={darkModeToggler} darkstate={darkMode} toggleState={toggleMenuState}/>
          <Topbar menuStateToggler={menuStateToggler} toggleState={toggleMenuState}/>
          <MainContent toggleState={toggleMenuState} history={props.history}/>
        </Router>
      </div>
    );
  }

  return <LoginScreen logSet={setLoggedStatus} />;
}

export default App;
