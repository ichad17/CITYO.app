import React from 'react';
import {Card, Button, AlertBox} from '../main.js'; 
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import '../App.css';
import menus from './menus.js';
import trash from '../images/trash.png';
const menusApi = "http://192.168.0.14:4000/menus";


function MenuItem(props) {
    return (
        <div className="item-tag">
            <p className="item-header">{props.menuname}</p> 
            <p className="item-subheader"><em>{props.menucat}</em></p>
        </div>
    )
}



class MenuList extends React.Component {
    constructor (props) {
        super(props);   
        this.state = {sortedMenu: "Loading...", alertBoxHandler: false, deleteId: null, deleteName: null};
        this.menulistCompare = null;
    }

    alertBoxHandler = async (name, id) => {
        console.log(this.state.alertBoxHandler)
        console.log(id)
        await this.setState({deleteId: id, deleteName: name})
        console.log(this.state.deleteId)
        this.boxToggle();
        
    }


    componentDidUpdate() {
        if (Array.isArray(this.props.menus) && this.props.menus != this.menulistCompare) {
            console.log(this.props.menus);
            this.menulistCompare = this.props.menus;
            this.menuRender();
        }
    }

    deleteCall = () => {
        console.log(this.state.deleteId)
        this.deleteFetch()
            .then (() => this.props.reRender(), console.log('promise'), this.boxToggle())
        
    }

    deleteFetch() {
        const menusDelete = "http://192.168.0.14:4000/menu/" + this.state.deleteId;
        return fetch(menusDelete, {method: 'DELETE'})
                .then (response => response.text())
                .then (data => console.log(data))
    } 

    boxToggle() {
        if (!this.state.alertBoxHandler) {  
            this.setState({alertBoxHandler: true});
        }
        else this.setState({alertBoxHandler: false});
    }

    menuRender() {
        console.log(this.props.menus);
        const menureversed = this.props.menus.reverse();
        const menuitems = menureversed.map((params) => 
            <Card>
                <MenuItem key={params._id} menuname={params.name} menucat={params.category}/>
                <div className="item-buttons">
                    <Link to={"/menus/edit/" + params._id}><Button id="new-menu-item">Edit Menu</Button></Link>
                    {/* <Button className="alert-button" id="new-menu-item">Delete Menu</Button> */}
                    <img onClick={() => this.alertBoxHandler(params.name, params._id)} src={trash}/>
                </div>
            </Card>
        );

        this.setState({sortedMenu: menuitems});
    }   

    render() {
        console.log(this.state.deleteName)
        return(
            <div className="grid-container">
                {this.state.sortedMenu}
                {this.state.alertBoxHandler && <AlertBox nameparams={this.state.deleteName} deleteFetch={this.deleteCall} alertToggle={this.alertBoxHandler} >Are you sure you want to delete</AlertBox>}
            </div>
        );
    }

}

class MenuView extends React.Component {
    constructor(props){
        super(props);
        this.getOptions = {
            method: 'GET',

        }
        this.state = {menus: "", rerender: 0}
    }

    componentDidMount() {
        console.log('DID MOUNT!')
        this.menusFetch();
    }

    menusFetch() {
        fetch(menusApi, this.getOptions)
            .then(response => response.text())
            .then((data) => {
                const parsed = JSON.parse(data);
                this.setState({menus: parsed});
                console.log(this.state.menus);
            });
    }
    
    rerender = () => {
        const incr = this.state.rerender + 1
        this.menusFetch();
        return <p>{incr}</p>
    }

    render(){
        return(
            <div>
                <MenuList reRender={this.rerender} menus={this.state.menus}/>
                <div>{this.rerender}</div>
            </div>
        )
    }
}

export default MenuView;
export {MenuItem};
