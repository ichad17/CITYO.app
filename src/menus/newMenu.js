import React from 'react';
import {Card, Button} from '../main.js'; 
import {
    BrowserRouter as Router,
    withRouter,
  } from "react-router-dom";
import '../App.css';
const axios = require('axios').default;

class MenuController extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return ;

    }
}

class MenuSetup extends React.Component {

    constructor(props) {
        super(props);  
        this.state = {name: "", cat: "", pleaseMsg: ""};
        this.handleNameChange = this.handleNameChange.bind(this); 
        this.handleCatChange = this.handleCatChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.postMenu = "http://192.168.0.14:4000/menus";
        this.getMenu = "http://192.168.0.14:4000/menu/byname/";
        this.postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null,

        }
        this.getOptions = {
            method: 'GET',
        }
    }
    
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleCatChange(e) {
        this.setState({cat: e.target.value});
    }

    postNewMenu() {
        const _submitData = {formName: this.state.name, formCat: this.state.cat};
        const submitData = JSON.stringify(_submitData);
        this.postOptions.body = submitData;
        console.log(this.postOptions.body);
        return fetch(this.postMenu, this.postOptions)
            .then(response => response.text())
            .then(data => console.log(data));

    }

    getMenuFromName() {
        let encoded = encodeURI(this.state.name);
        this.getMenu = this.getMenu + encoded;
        console.log(this.getMenu);
        fetch(this.getMenu, this.getOptions)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                this.props.history.push('/menus/edit/' + data[0]._id);
            })
            .catch(err => console.log(err));

    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name == "" || this.state.name == " " ) {
            return this.setState({pleaseMsg: "Please enter a name"});
        }
        this.postNewMenu()
            .then(response => this.getMenuFromName())         
    }

    
    render() {
        return (
            <Card id="newMenu">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Menu Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Menu Category:
                        <input type="text" value={this.state.cat} onChange={this.handleCatChange} />
                    </label>
                    <p style={{color: "red"}}>{this.state.pleaseMsg}</p>
                    <input type="submit" value="Next" />
                </form>
            </Card>
        );
    }
}

const MenuSetupRouted = withRouter(MenuSetup);


class NewMenu extends React.Component {

    constructor(props) {
        super(props);  
    }
    
    render() {
        return (
            <MenuSetupRouted/>
        );
    }
}

export default NewMenu;;