import React, {useEffect, useState, useRef} from 'react';
import {Card, Button} from '../main.js'; 
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

function LoginScreen(props) {

    const [userName, setUserName] = useState();
    const [userPass, setUserPass] = useState();
    const [passConfirm, setPassConfirm] = useState();
    const [loginRegister, setLoginRegister] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    
    const newUser = () => {
        const userApiAddress = "http://192.168.0.14:4000/user/sign-up";
        const submitData = {name: userName, password: userPass, email: userName};
        console.log(submitData + ' here');
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
            
        }
        console.log(postOptions);

        fetch(userApiAddress, postOptions)
            .then(data => console.log(data));
    } 

    const loginSuccess = () => {
        props.logSet(true);
    }
    
    const login = () => {
        const userApiAddress = "http://192.168.0.14:4000/user/verify";
        const submitData = {name: userName, password: userPass};
        console.log(submitData + ' here');
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
            
        }

        fetch(userApiAddress, postOptions)
            .then(response => response.json())
            .then(data =>  {
                console.log(data)
                if (data.verified == true) {
                    loginSuccess();
                }
            });

    } 

    const handleFormValue = (e) => {
        e.preventDefault();
        if (e.target.id == "username") {
            setUserName(e.target.value);
        }

        else if (e.target.id == "password") {
            setUserPass(e.target.value);
        }
        
        else if (e.target.id == "password-confirm") {
            setPassConfirm(e.target.value);
        }
        console.log(userName, userPass);
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrorDisplay(null);
        if (e.target.value == "Register") {
            console.log('new user')
            if (userPass == passConfirm){
                newUser();
            }

            else {
                setErrorDisplay("Passwords do not match");
            }
        }

        else if (e.target.value == "Login") {
            login();
        }
    }

    const handleFormSwap = (e) => {
        e.preventDefault();
        setLoginRegister(!loginRegister);
    }
    
    let confirmPasswordField;

    if (loginRegister == true) {
        confirmPasswordField = ( 
            <label>
                Confirm Password:
                <input id="password-confirm" type="password"  onChange={handleFormValue}/>
            </label>
        );
    }

    else {
        confirmPasswordField = null;
    }



    return(
        <div className="login-page">
            <div className="login-form-area">
                <Card>
                    <h2>Hey there! Welcome to MITYO</h2>
                    <form  className="">
                        <p style={{color: "red"}}>{errorDisplay}</p>
                        <label>
                            {loginRegister ? "Email:" : "Username (email):"}
                            <input id="username" type="email" required onChange={handleFormValue}/>
                        </label>
                        <label>
                            Password:
                            <input id="password" type="password"  onChange={handleFormValue}/>
                        </label>
                        {confirmPasswordField}
                        <input onClick={handleFormSubmit} type="submit" value={loginRegister ? "Register" : "Login"} />
                        <input onClick={handleFormSwap}  className="btn-secondary" type="submit" value={loginRegister ? "Login" : "Register"} />
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default LoginScreen;