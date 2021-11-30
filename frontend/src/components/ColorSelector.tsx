import React, {useState} from "react";

import {  
    Tag,
    BubbleColors
  } from "../store/reducers/data";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const ColorSelector = function({
    bubbleColors,
    bubbleColorValue,
    setBubbleColorValue
}:{
    bubbleColors: BubbleColors[],
    bubbleColorValue: string,
    setBubbleColorValue: React.Dispatch<React.SetStateAction<string>>
}){
    return (
        <div className="d-grid">            
            <ToggleButtonGroup name='toggle-two' type='radio' defaultValue='10'>          
                {bubbleColors.map((bubbleColor, idx) => (            
                    <ToggleButton
                    key={idx}
                    id={`bubble-color-${idx}`}
                    type="radio"
                    variant={bubbleColor.color}                
                    name="radio"
                    value={bubbleColor.value}
                    checked={bubbleColor.value == bubbleColorValue}
                    onChange={(e) => setBubbleColorValue(e.currentTarget.value)}
                    >
                    {bubbleColor.name}                
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>                                               
        </div>        
    )
}

export default ColorSelector;