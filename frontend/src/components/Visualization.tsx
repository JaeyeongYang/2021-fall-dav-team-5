import React, {useState} from "react";

import "./Visualization.css";
import ScatterPlotMenu from "./ScatterPlotMenu";

import PopupWindow from "./PopupWindow";
import {getMenus, getAMenu} from "../api";
import {Menu} from "../Menu";

const Visualization = function () {
    const menus = getMenus(); 
    const menu = getAMenu(1); // id: 1
    
    return (                
        <div className='vis-div'>
            <div> 
                {/* 채: 여기서 작업하시면 됩니다. */}
                <PopupWindow text="Pie Chart"></PopupWindow>
                <p>버블 차트 들어가는 곳</p>
            </div>
            
            <div className='scatter-plot-menu-div'>
                {/* Scatter plot으로 변환해주는 버튼들 */}
                <ScatterPlotMenu></ScatterPlotMenu>
            </div>
        </div>        
    )
};

export default Visualization;

