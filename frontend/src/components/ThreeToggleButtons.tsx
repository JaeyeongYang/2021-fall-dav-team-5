import React, {useState} from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function ThreeToggleButtons() {    
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: 'Include', value: '1', color: 'outline-primary'},
      { name: 'Exclude', value: '2', color: 'outline-success'},
      { name: 'Menu', value: '3', color: 'outline-danger' },
    ];    

    return (
      <div className="d-grid">                                
        <ToggleButtonGroup name='toggle-three' type='radio' defaultValue='1'>          
          {radios.map((radio, idx) => (            
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.color}                
              name="radio"
              value={radio.value}
              checked={radio.value == radioValue}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    );
  }

export default ThreeToggleButtons;


{/* <ToggleButtonGroup type="checkbox">
            <ToggleButton value={1}>Include</ToggleButton>
            <ToggleButton value={2}>Exclude</ToggleButton>
            <ToggleButton value={3}>Menu</ToggleButton>
        </ToggleButtonGroup> */}