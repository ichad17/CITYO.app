import React, {useEffect, useState, useRef} from 'react';
import {Card, Button} from '../main.js'; 
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import '../App.css';
import trash from '../images/trash.png';
import menus from './menus.js';

function formAnimate() {
    const styles = document.getElementsByTagName('form')[0];
    styles.classList.add('itemAnimate-2');
}

//TODO: add item desc to the form creation

function ItemForm(props) {
    
    const [itemName, setFormName] = useState(null);
    const [itemPrice, setFormPrice] = useState(null);
    const [itemDesc, setItemDesc] = useState(null);

    useEffect(() => {   
        formAnimate();
    });

    const pushToServer = () => {
        const sectionId = props.category.id;
        const menusApiAddress = "http://192.168.0.14:4000/menu/" + props.urlparams.menuid + "/add-item" ;
        const submitData = {name: itemName, price: itemPrice, subid: props.category.id};
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)

        }

        fetch(menusApiAddress, postOptions)
            .then(props.formCallback());
    }

    const handleFormValue = (e) => {
        e.preventDefault();
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
        console.log('before callback')
        
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
        const submitData = {name: catName};
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)

        }
        console.log(postOptions);

        fetch(menusApiAddress, postOptions)
            .then(response => response.text())
            .then(data => {
            });
    }

    const handleFormValue = (e) => {
        e.preventDefault();
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

function AddSectionRender(props) {
    if (props.renderCondition == null) {
        return <Button className={props.activeClass} onClick={() => props.showClickHandler('courseContainer', 'setCourse')}>{!props.isBtnActive ? 'Add Section' : 'Cancel'}</Button>
    }
    return <span></span>;
}

function EditMenuPage() {
    
    const paramz = useParams();
    const [currentMenu, setMenu] = useState('loading...');
    const [formContainer, setForm] = useState(false);
    const [courseContainer, setCourse] = useState(false)
    const [activeClass, setActiveClass] = useState("true");
    const [isBtnActive, setBtnActive] = useState(false);
    const [itemList, setItemList] = useState(null);
    const [mappedItemChecker, setItemChecker] = useState(null);
    const menuStateCompare = useRef('ref');
    const itemGate = useRef(false);
    const [updater, setUpdate] = useState(0);
    const menusApi = "http://192.168.0.14:4000/menu/" + paramz.menuid;
    const getOptions =  {
        method: 'GET',
    }  

    const deleteItem = (item, subId, itemId) => {
        const submitData = {name: item, subid: subId, itemid: itemId}
        console.log(submitData)
        const postOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        }
        fetch(menusApi + "/delete-item", postOptions)
            .then(response => response.text())
            .then(data => {
                sectionRender();
            });
    }

    const sectionRender = () => {
        console.log('called, at least'        )
        if (currentMenu.section) {
            console.log('ya render!', currentMenu.section)
            let mapped = [];
            mapped = currentMenu.section.map((params, i) => {
                let conditionalFormRender = false;
                let conditionalButtonRender = false;
                let fetchRequest = {id: params._id};
                if (mappedItemChecker == i) {
                    conditionalFormRender = <ItemForm category={fetchRequest} updateParentState={updateState} formCallback={itemCallback} urlparams={paramz}/>;
                    conditionalButtonRender = <Button className={activeClass + ' add-item-button'} onClick={() => showClickHandler(formContainer, setForm)}>Cancel</Button> ;
                }

                else {
                    conditionalFormRender = false;
                    conditionalButtonRender = !isBtnActive && <Button className={activeClass + ' add-item-button'} onClick={() => showClickHandler(formContainer, setForm, i)}>+</Button> ;
                }
                return(
                    <Card key={i} className="item">
                        <h2>{params.name}</h2>
                        {params.item.map((params2) => {
                            return (
                                <Card style="sub-item">
                                    <p>{params2.name}</p>
                                    <div>
                                        <p>{"£" + params2.price}</p>
                                        <img onClick={() => deleteItem(params2.name, params._id, params2._id)} src={trash}/>
                                    </div>
                                </Card>
                            );
                        })}   
                        {conditionalButtonRender}
                        {conditionalFormRender}    
                    </Card>
                );                    
            });
            setItemList(mapped);
            menuStateCompare.current = currentMenu;
        }
    }

    
    useEffect( () => {
            fetch(menusApi, getOptions)
                .then(response => response.text())
                .then(data => {
                    const parsed = JSON.parse(data);
                    console.log(parsed)
                    const currentMenuJSON = JSON.stringify(currentMenu);
                    const menuStateCompareJSON = JSON.stringify(menuStateCompare.current)
                    const parsedJSON = JSON.stringify(parsed);
                    if (currentMenuJSON != menuStateCompareJSON || itemGate.current == true || currentMenuJSON != parsedJSON) {
                        console.log(currentMenu, menuStateCompare, itemGate.current)
                        itemGate.current = false;
                        setMenu(parsed);
                        sectionRender();
                    }
                })

    });

    const formStateHandler = (handlerState, setHandlerState, target) => {
        if (handlerState == "courseContainer") {
            handlerState = eval(handlerState);
            setHandlerState = eval(setHandlerState);
        }   
        if (handlerState == false) {
            setItemChecker(target);
            setHandlerState(true);
            setBtnActive(true);
            setActiveClass("cancel-button");
            return;
        }   
        setHandlerState(false);
        setItemChecker(null)
        setBtnActive(false);
        setActiveClass(" ");
        sectionRender(); 
    }

    const showClickHandler = (state, setState, arraynum) => {
        itemGate.current = true; 
        formStateHandler(state, setState, arraynum); 
    }

    const itemCallback = () => {
       showClickHandler(formContainer, setForm)
    }

    const catCallback = () => {
        formStateHandler(courseContainer, setCourse)
    }

    const updateState = () => {
        let updateIncrement = updater + 1;
        setUpdate(updateIncrement);
    }

    return (
        <div>
            <h2>{currentMenu.name}</h2>
            <h3>{currentMenu.category}</h3>
            <AddSectionRender activeClass={activeClass} renderCondition={mappedItemChecker} isBtnActive={isBtnActive} showClickHandler={showClickHandler}/>
            <div>{courseContainer && <CatForm updateParentState={updateState} formCallback={catCallback} urlparams={paramz}/>}</div>
            <div className="grid-container">{itemList}</div>
        </div>
    );
}

export default EditMenuPage;    