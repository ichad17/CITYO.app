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

function CatForm(props) {

    const [catName, catNameUpdate] = useState("")

    useEffect(() => {
        formAnimate();
    });

    const pushToServer = () => {
        const menusApiAddress = "http://192.168.0.14:4000/menu/" + props.urlparams.menuid + "/add-cat" ;
        console.log(menusApiAddress)
        const submitData = {name: catName};
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)

        }
        console.log(submitData)

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
        catNameUpdate(e.target.value);

    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        pushToServer();
        props.formCallback();
        
    }

    return (
        <form onSubmit={handleFormSubmit} className="itemAnimate">
            <label>
                Section Name:
                <input onChange={handleFormValue} type="text" />
            </label>
            <input type="submit" value="Add Item" />
        </form>
    );
}


function EditMenuPage() {
    
    const params = useParams();
    const [currentMenu, setMenu] = useState('loading...');
    const [formContainer, setForm] = useState(-2);
    const [courseContainer, setCourse] = useState(false)
    const [activeClass, setActiveClass] = useState("true");
    const [isBtnActive, setBtnActive] = useState(false);
    const [itemList, setItemList] = useState(null);
    const menuStateCompare = useRef('ref');
    const itemGate = useRef(false);
    const [updater, setUpdate] = useState(0);
    const menusApi = "http://192.168.0.14:4000/menu/" + params.menuid;
    const getOptions =  {
        method: 'GET',
    }  

    const sectionRender = () => {
        if (currentMenu.section) {
            let mapped = [];
            console.log(currentMenu.section);
            mapped = currentMenu.section.map((params, i) => {
                let conditionalFormRender = false;
                let conditionalButtonRender = false;
                if (formContainer == i) {
                    console.log(formContainer)
                    conditionalFormRender = <ItemForm updateParentState={updateState} formCallback={itemCallback} params={params}/>;
                    conditionalButtonRender = <Button className={activeClass} onClick={() => showClickHandler(formContainer, setForm, i)}>Cancel</Button> ;   
                }

                else {
                    conditionalFormRender = false;
                    conditionalButtonRender = <Button className={activeClass} onClick={() => showClickHandler(formContainer, setForm, i)}>Add Item</Button> 
                }
                return(
                    <div key={i} className="item">
                        {console.log(params._id)}
                        <h2>{params.name}</h2>
                        {conditionalButtonRender}
                        {conditionalFormRender}
                        {params.item ? params.item.map(params2 => <p>{params2.item}</p>) : "no items"}       
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
                    
                    if (currentMenu.section) {
                       console.log('item detected');
                       var currentMenuLength = currentMenu.section.length;
                       var currentCompareLength = parsed.section.length;
                    }

                    if ((currentMenu == 'loading...') || (currentMenuLength != currentCompareLength)) {
                        return setMenu(parsed);   
                    }
                    console.log(currentMenu);
                })
                .then(() => {
                    if (currentMenu != menuStateCompare.current || itemGate.current == true) {
                        sectionRender();
                        itemGate.current = false;
                    }
                });
    });

    const formStateHandler = (handlerState, setHandlerState, target) => {
            if (formContainer) {
                console.log(target);
                setHandlerState(target);
                setActiveClass("cancel-button");

            }
            else if (handlerState == false) {
                console.log(target);
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

    const showClickHandler = (state, setState, arraynum) => {
        console.log(arraynum);
        itemGate.current = true; 
        formStateHandler(state, setState, arraynum); 
        console.log(state);
    }

    const itemCallback = () => {
        formStateHandler(formContainer, setForm)
    }

    const catCallback = () => {
        formStateHandler(courseContainer, setCourse)
    }

    const updateState = () => {
        let updateIncrement = updater + 1;
        setUpdate(updateIncrement);
        console.log(currentMenu.item);
        console.log(menuStateCompare.current.item);
    }

    return (
        <Card>
            <h2>{currentMenu.name}</h2>
            <h3>{currentMenu.category}</h3>
            {<Button className={activeClass} onClick={() => showClickHandler(courseContainer, setCourse)}>{!isBtnActive ? 'Add Section' : 'Cancel'}</Button>}
            <div>{courseContainer && <CatForm updateParentState={updateState} formCallback={catCallback} urlparams={params}/>}</div>
            <div>{itemList}</div>
        </Card>
    );
}

export default EditMenuPage;    