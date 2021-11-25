import React, { useState, useEffect } from 'react';
import "./App.css";

import { BACKEND_DOMAIN } from "./globals";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  DataState,
<<<<<<< HEAD
  doneLoadingData,
  loadData,
  setHashtags,
  setIngredients,
=======
  Tag,
  doneLoadingMenuDetail,
  doneLoadingMenus,
  loadMenus,
  setHashtags,
  setIngredients,
  setMenuDetail,
>>>>>>> main
  setMenus,
  setPats,
  setWays,
} from "./store/reducers/data";
import Header from "./components/Header";
import Body from "./components/Body";

// import {Menu} from "./Menu";
// import {getMenus, getAMenu} from "./api";

import "./App.css";
import axios from "axios";

import "./App.css";
import axios from "axios";

function App() {
  // Menu.tsx
  // const menus = getMenus(); 
  // const menu = getAMenu(1); // id: 1

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

<<<<<<< HEAD
            
=======
  //////////////////
>>>>>>> main
  const data: DataState = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
<<<<<<< HEAD
    dispatch(loadData);
=======
    dispatch(loadMenus);
>>>>>>> main

    axios({
      url: `${BACKEND_DOMAIN}/ingredients/`,
      method: "GET",
    })
      .then((res) => res.data)
      .then((data) => {
        dispatch(setIngredients(data));
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });

    axios({
      url: `${BACKEND_DOMAIN}/options/`,
      method: "GET",
    })
      .then((res) => res.data)
      .then((data) => {
        dispatch(setWays(data.way));
        dispatch(setPats(data.pat));
        dispatch(setHashtags(data.hashtag));
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }, [dispatch]);

  // When data.flagLoadData changes
  useEffect(() => {
<<<<<<< HEAD
    if (data.flagLoadData) {
=======
    if (data.flagLoadMenus) {
>>>>>>> main
      axios({
        url: `${BACKEND_DOMAIN}/menus/`,
        method: "GET",
      })
        .then((res) => res.data)
        .then((data) => {
          dispatch(setMenus(data));
        })
        .catch(function (error) {
          console.log("Request failed", error);
        });

<<<<<<< HEAD
      dispatch(doneLoadingData);
    }
  }, [data.flagLoadData, dispatch]);

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
=======
      dispatch(doneLoadingMenus);
    }
  }, [data.flagLoadMenus, dispatch]);

  useEffect(() => {
    if (data.flagLoadMenuDetail && data.menuID !== undefined) {
      const menuID = data.menuID;

      axios({
        url: `${BACKEND_DOMAIN}/menus/${menuID}`,
        method: "GET",
      })
        .then((res) => res.data)
        .then((data) => {
          dispatch(setMenuDetail(data));
          console.log(`Done loading menu #${menuID}`);
        })
        .catch(function (error) {
          console.log("Request failed", error);
        });

      dispatch(doneLoadingMenuDetail);
    }
  }, [data.flagLoadMenuDetail, data.menuID, dispatch]);

  return (
    <div className="App">
      <Header></Header>
      <Body      
      searchOnKeyPress={searchOnKeyPress}
      searchOnChange={searchOnChange}         
      searchInitLists={searchInitLists}
      getAllList={getAllList}

      getRadioValue={getRadioValue}
      setThreeToggleValue={setThreeToggleValue}
    ></Body>
>>>>>>> main
    </div>
  );
}

export default App;