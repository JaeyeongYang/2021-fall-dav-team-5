import React, { useState, useEffect } from 'react';
import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";
import { Tag } from "./interfaces";

import {Menu} from "./Menu";
import {getMenus, getAMenu} from "./api";


function App() {
  // Menu.tsx
  const menus = getMenus(); 
  const menu = getAMenu(1); // id: 1

  // for Search.tsx
  const [ingredientOrMenu, setIngredientOrMenu] = useState('');    
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [ingredientNotList, setIngredientNotList] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<string[]>([]);
  const [allList, setAllList] = useState<Tag[]>([]);

  const searchOnKeyPress = (e: any) => { 
    if(e.key=='Enter') { editLists(e) } 
  }

  const editLists = (e: any) => {        
    if (radioValue == '1') {
        setIngredientList(oldArray => [...oldArray, ingredientOrMenu]);
        // setIngredientList(ingredient_list);
    } else if (radioValue == '2') {
        setIngredientNotList(oldArray => [...oldArray, ingredientOrMenu]);
    } else {
        setMenuList(oldArray => [...oldArray, ingredientOrMenu]);                        
    }
    
    setAllList(oldArray => [...oldArray, {
        ingredientOrMenu: ingredientOrMenu, 
        radioValue: radioValue}
    ]);
    
    e.target.value = ''; // initialize input bar
  } 
  
  const searchOnChange = (e: any) => {
    setIngredientOrMenu(e.target.value)
  }

  const searchInitLists = () => {
    setIngredientList([]);        
    setIngredientNotList([]);        
    setMenuList([]);        
    setAllList([]);            
  }

  const getAllList = () => {
    return allList
  }
  
  // for Three ToggleButtons.tsx
  const [radioValue, setRadioValue] = useState('1');

  const setThreeToggleValue = (s:string) => {
    setRadioValue(s);    
  }

  const getRadioValue = () => {
    return radioValue;
  }

  // monitor changes
  useEffect(()=>{        
    console.log('=========================')
    console.log('ingredientList:', ingredientList);
    console.log('ingredientNotList:', ingredientNotList);
    console.log('menuList:', menuList);
    console.log('allList:', allList);
  }, [ingredientList, ingredientNotList, menuList, allList]);

  return (
    <div className="App">
      <Header></Header>      
      <Body
        menus={menus}
        menu={menu}

        searchOnKeyPress={searchOnKeyPress}
        searchOnChange={searchOnChange}         
        searchInitLists={searchInitLists}
        getAllList={getAllList}

        getRadioValue={getRadioValue}
        setThreeToggleValue={setThreeToggleValue}
      ></Body>      
    </div>
  );
}

export default App;
