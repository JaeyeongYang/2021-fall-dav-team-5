import React, { useEffect } from "react";

import { BACKEND_DOMAIN } from "./globals";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  DataState,
  doneLoadingData,
  loadData,
  setHashtags,
  setIngredients,
  setMenus,
  setPats,
  setWays,
} from "./store/reducers/data";
import Header from "./components/Header";
import Body from "./components/Body";

import "./App.css";
import axios from "axios";

function App() {
  const data: DataState = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadData);

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
    if (data.flagLoadData) {
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

      dispatch(doneLoadingData);
    }
  }, [data.flagLoadData, dispatch]);

  return (
    <div className="App">
      <Header></Header>
      <Body></Body>
    </div>
  );
}

export default App;
