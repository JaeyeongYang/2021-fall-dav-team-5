import React from "react";
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

  return (
    <div>
      <span>Example component on how to load data state with redux</span>
      <div>
        <Button onClick={loadData}>Load menu</Button>
        <Button onClick={clearData}>Clear menu</Button>
      </div>
      <div>
        <pre>{menuDetail && JSON.stringify(menuDetail)}</pre>
      </div>
    </div>
  );
};

export default ExampleComponent;
