import React, {useState} from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function ThreeToggleButtons() {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: 'Include', value: '1', color: 'outline-primary'},
      { name: 'Exclude', value: '2', color: 'outline-success'},
      { name: 'Menu', value: '3', color: 'outline-danger' },
    ];    

    return (
      <>                                
        <ToggleButtonGroup name='toggle-three' type='radio'>          
          {radios.map((radio, idx) => (            
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              // type="radio"
              variant={radio.color}                
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </>
    );
  }

export default ThreeToggleButtons;


{/* <ToggleButtonGroup type="checkbox">
            <ToggleButton value={1}>Include</ToggleButton>
            <ToggleButton value={2}>Exclude</ToggleButton>
            <ToggleButton value={3}>Menu</ToggleButton>
        </ToggleButtonGroup> */}