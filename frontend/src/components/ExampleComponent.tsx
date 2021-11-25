import React from "react";
<<<<<<< HEAD

import { useAppSelector } from "src/hooks";
import {
  selectHashtags,
  selectIngredients,
  selectMenus,
  selectPats,
  selectWays,
} from "src/store/reducers/data";

const ExampleComponent = function () {
  const menus = useAppSelector(selectMenus);
  const ingredients = useAppSelector(selectIngredients);
  const ways = useAppSelector(selectWays);
  const pats = useAppSelector(selectPats);
  const hashtags = useAppSelector(selectHashtags);
=======
import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  clearMenuDetail,
  loadMenuDetail,
  selectMenuDetail,
} from "src/store/reducers/data";

const ExampleComponent = function () {
  const menuDetail = useAppSelector(selectMenuDetail);
  const dispatch = useAppDispatch();

  const loadData = () => {
    dispatch(loadMenuDetail(1));
  };

  const clearData = () => {
    dispatch(clearMenuDetail());
  };
>>>>>>> main

  return (
    <div>
      <span>Example component on how to load data state with redux</span>
<<<<<<< HEAD
=======
      <div>
        <Button onClick={loadData}>Load menu</Button>
        <Button onClick={clearData}>Clear menu</Button>
      </div>
      <div>
        <pre>{menuDetail && JSON.stringify(menuDetail)}</pre>
      </div>
>>>>>>> main
    </div>
  );
};

export default ExampleComponent;
