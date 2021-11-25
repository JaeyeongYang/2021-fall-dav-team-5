import React, { useState, useEffect } from 'react';
import "./App.css";

import { BACKEND_DOMAIN } from "./globals";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  DataState,
  Tag,
  BubbleColors,
  doneLoadingMenuDetail,
  doneLoadingMenus,
  loadMenus,
  setHashtags,
  setIngredients,
  setMenuDetail,
  setMenus,
  setPats,
  setWays,
} from "./store/reducers/data";
import Header from "./components/Header";
import Body from "./components/Body";

import "./App.css";
import axios from "axios";

function App() {
  // Search.tsx
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

  const deleteIngredientOrMenu = (e: any) => {
    const element = e.target as HTMLButtonElement;
    const radioValueElem = element.id;
    const ingredientOrMenuElem = element.name;

    if (radioValueElem == "1") {
      setIngredientList(ingredientList.filter(item => item != ingredientOrMenuElem))
    } else if (radioValueElem == '2') {
      setIngredientNotList(ingredientNotList.filter(item => item != ingredientOrMenuElem))
    } else {
      setMenuList(menuList.filter(item => item != ingredientOrMenuElem));                        
    }

    setAllList(allList.filter(item => item.ingredientOrMenu != ingredientOrMenuElem));

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
  
  // ThreeToggleButtons.tsx
  const [radioValue, setRadioValue] = useState('1');

  const setThreeToggleValue = (s:string) => {
    setRadioValue(s);    
  }

  const getRadioValue = () => {
    return radioValue;
  }

  // ColorSelector.tsx
  const [bubbleColorValue, setBubbleColorValue] = useState('10');
  
  const bubbleColors : BubbleColors[] = [
    { name: 'Menu Category', value: '10', color: 'outline-info'},
    { name: 'How to Cook', value: '11', color: 'outline-info'},      
  ];
  
  // ColorFilter.tsx
  const [menuCategory, setMenuCategory] = useState('Show All');
  const [howToCook, setHowToCook] = useState('Show All');

  // monitor changes
  // Search.tsx
  useEffect(()=>{        
    console.log('===== Search.tsx =====')
    console.log('ingredientList:', ingredientList);
    console.log('ingredientNotList:', ingredientNotList);
    console.log('menuList:', menuList);
    console.log('allList:', allList);    
  }, [ingredientList, ingredientNotList, menuList, allList]);
  
  //ColorSelector.tsx % ColorFilter.tsx
  useEffect(()=>{        
    console.log('===== ColorSelector.tsx & ColorFilter.tsx =====')
    console.log('bubbleColorValue (10: Menu Category, 11: How to Cook):', bubbleColorValue);    
    console.log('MenuCategory:', menuCategory);
    console.log('howToCook:', howToCook);
  }, [bubbleColorValue, menuCategory, howToCook]);

  //////////////////
  const data: DataState = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMenus);

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
    if (data.flagLoadMenus) {
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
      deleteIngredientOrMenu={deleteIngredientOrMenu}

      bubbleColors={bubbleColors}
      bubbleColorValue={bubbleColorValue}
      setBubbleColorValue={setBubbleColorValue}

      menuCategory={menuCategory}
      howToCook={howToCook}
      setMenuCategory={setMenuCategory}
      setHowToCook={setHowToCook}
    ></Body>
    </div>
  );
}

export default App;