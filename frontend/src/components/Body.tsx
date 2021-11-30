import React from "react";

import Search from "./Search";
import Visualization from "./Visualization";

import "./Body.css";
import ExampleComponent from "./ExampleComponent";

const Body = function () {
  return (
    <div className="main">
      <Search></Search>
      <Visualization></Visualization> 
      <ExampleComponent />
    </div>
  );
};

export default Body;
