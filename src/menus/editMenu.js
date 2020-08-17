import React, {useEffect, useState, useRef} from 'react';
import {Card, Button} from '../main.js'; 
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import '../App.css';
import menus from './menus.js';

function formAnimate() {
    const styles = document.getElementsByTagName('form')[0];
    styles.classList.add('itemAnimate-2');
}

function ItemForm(props) {
    
    const [itemName, setFormName] = useState(null);
    const [itemPrice, setFormPrice] = useState(null);

    useEffect(() => {
        formAnimate();
    });

    const pushToServer = () => {
        const menusApiAddress = "http://192.168.0.14:4000/menu/" + props.params.menuid + "/add-item" ;
        const submitData = {name: itemName, price: itemPrice};
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)

        }

        fetch(menusApiAddress, postOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                props.updateParentState();
            });
    }

    const handleFormValue = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        if (e.target.id == 'item') {
            setFormName(e.target.value);
        }

        if (e.target.id == 'price') {
            setFormPrice(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        pushToServer();
        props.formCallback();
        
    }

    return (
        <form onSubmit={handleFormSubmit} className="itemAnimate">
            <label>
                Item:
                <input id="item" type="text" onChange={handleFormValue}/>
            </label>
            <label>
                Price:
                <input id="price" type="number" min="1" step="any" onChange={handleFormValue}/>
            </label>
            <input type="submit" value="Add Item" />
        </form>
    );
}

function CatForm() {
    useEffect(() => {
        formAnimate();
    });

    return (
        <form className="itemAnimate">
            <label>
                Section Name:
                <input type="text" />
            </label>
            <input type="submit" value="Add Section" />
        </form>
    );
}


function EditMenuPage() {
    
    const params = useParams();
    const [currentMenu, setMenu] = useState('loading...');
    const [formContainer, setForm] = useState(false);
    const [courseContainer, setCourse] = useState(false)
    const [activeClass, setActiveClass] = useState("true");
    const [isBtnActive, setBtnActive] = useState(false);
    const [itemList, setItemList] = useState(null);
    const menuStateCompare = useRef('ref');
    const [updater, setUpdate] = useState(0);
    const menusApi = "http://192.168.0.14:4000/menu/" + params.menuid;
    const getOptions =  {
        method: 'GET',
    }  

    const itemRender = () => {
        if (currentMenu.item) {
            let mapped = [];
            console.log("item render conditional success");
            mapped = currentMenu.item.map((params) => {
                return(
                    <div className="item">
                        <p>{params.name}</p>
                        <p>{params.price}</p>
                    </div>
                );                    
            });
            setItemList(mapped);
            menuStateCompare.current = currentMenu;
            console.log('re-rendered')
        }
    }


    useEffect( () => {
            fetch(menusApi, getOptions)
                .then(response => response.text())
                .then(data => {
                    const parsed = JSON.parse(data);
                    console.log('Main page get menu fetch here');
                    console.log(parsed);
                    console.log(currentMenu);
                    
                    if (currentMenu.item) {
                       console.log('item detected');
                       var currentMenuLength = currentMenu.item.length;
                       var currentCompareLength = parsed.item.length;
                    }

                    if ((currentMenu == 'loading...') || (currentMenuLength != currentCompareLength)) {
                        setMenu(parsed);   
                    }
                    console.log(currentMenu);
                })
                .then(() => {
                    if ((currentMenu != menuStateCompare.current)) {
                        itemRender();
                    }
                });
    });

    const formStateHandler = (handlerState, setHandlerState) => {
            if (handlerState == false) {
                setHandlerState(true);
                setBtnActive(true);
                setActiveClass("cancel-button");
            }
            else {
                setHandlerState(false);
                setBtnActive(false);
                setActiveClass(" ");
            }
    }

    const showClickHandler = (state, setState) => {
        formStateHandler(state, setState); 
    }

    const formCallback = () => {
        formStateHandler(formContainer, setForm)
    }

    const updateState = () => {
        let updateIncrement = updater + 1;
        setUpdate(updateIncrement);
        console.log("it fuckin' fired, at least");
        console.log(currentMenu.item);
        console.log(menuStateCompare.current.item);
    }

    return (
        <Card>
            <h2>{currentMenu.name}</h2>
            <h3>{currentMenu.category}</h3>
            {!courseContainer && <Button className={activeClass} onClick={() => showClickHandler(formContainer, setForm)}>{!isBtnActive ? 'Add Item' : 'Cancel'}</Button>}{!formContainer && <Button className={activeClass} onClick={() => showClickHandler(courseContainer, setCourse)}>{!isBtnActive ? 'Add Section' : 'Cancel'}</Button>}
            <div>{formContainer && <ItemForm updateParentState={updateState} formCallback={formCallback} params={params}/>}</div>
            <div>{courseContainer && <CatForm/>}</div>
            <div>{itemList}</div>
        </Card>
    );
}

export default EditMenuPage;    