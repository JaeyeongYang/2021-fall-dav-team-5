import React from "react";

import Search from "./Search";
import Visualization from "./Visualization";

import "./Body.css";

const Body = function () {
    
    return (     
        <div className="main">   
        <Search></Search>
        <Visualization></Visualization>
        </div>   
      );

}

export default Body;

