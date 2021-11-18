import React, {useState} from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


let exportRadioValue:string = '1';

function ThreeToggleButtons() {    
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
      { name: 'Have it', value: '1', color: 'outline-primary'},
      { name: "Don't have", value: '2', color: 'outline-danger'},
      { name: 'Menu', value: '3', color: 'outline-success' },
    ];
    
    const setToggleValue = (s:string) => {
      setRadioValue(s);
      exportRadioValue = s;
    }

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
              onChange={(e) => setToggleValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    );
  }

export default ThreeToggleButtons;
export { exportRadioValue };

{/* <ToggleButtonGroup type="checkbox">
            <ToggleButton value={1}>Include</ToggleButton>
            <ToggleButton value={2}>Exclude</ToggleButton>
            <ToggleButton value={3}>Menu</ToggleButton>
        </ToggleButtonGroup> */}