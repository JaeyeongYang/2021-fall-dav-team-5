import React, {useState} from "react";

import "./Visualization.css";
import ScatterPlotMenu from "./ScatterPlotMenu";

import PopupWindow from "./PopupWindow";
import ColorSelector from "./ColorSelector";
import BubbleChart from "./BubbleChart";
import { Menu } from "../store/reducers/data";
import './BubbleChart.css'
import { useAppSelector } from "src/hooks";
import {
  selectHashtags,
  selectIngredients,
  selectMenus,
  selectPats,
  selectWays,
} from "src/store/reducers/data";



const Visualization = function () {
    const menus = useAppSelector(selectMenus);
    
    const selectedKeyHandler = (key: string) => {
        // eslint-disable-next-line no-alert
        alert(key)
      };
    let selectedMenus: [] = menus?.slice(1, 200) as [];
    // const selectedMenus = menus?.slice(1, 200);
    // console.log(menus?.slice(1, 20)); 
    console.log(menus) 

    return (                
        <div className='vis-div'>
            {/* <div className='color-selector-div'>                
                <ColorSelector></ColorSelector>
            </div> */}
            
            <div> 
                {/* <PopupWindow text="Pie Chart"></PopupWindow> */}
                <BubbleChart bubblesData={selectedMenus} width={1300} height={700} textFillColor="drakgrey" backgroundColor="#ffffff" minValue={1} maxValue={200} selectedCircle={selectedKeyHandler} />
            </div>
            
            <div className='scatter-plot-menu-div'>                
                <ScatterPlotMenu></ScatterPlotMenu>
            </div>
        </div>        
    )
};

export default Visualization;

