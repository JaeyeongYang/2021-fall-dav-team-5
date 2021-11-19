import React from "react";

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

  return (
    <div>
      <span>Example component on how to load data state with redux</span>
    </div>
  );
};

export default ExampleComponent;
