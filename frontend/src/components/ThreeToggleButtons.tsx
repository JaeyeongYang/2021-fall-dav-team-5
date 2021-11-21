import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


let exportRadioValue:string = '1';

function ThreeToggleButtons({ 
  getRadioValue,
  setThreeToggleValue
}:{
  getRadioValue: () => string,
  setThreeToggleValue: (s: string) => void
}) {    
    
    const radios = [
      { name: 'Have it', value: '1', color: 'outline-primary'},
      { name: "Don't have", value: '2', color: 'outline-danger'},
      { name: 'Menu', value: '3', color: 'outline-success' },
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
              checked={radio.value == getRadioValue()}
              onChange={(e) => setThreeToggleValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    );
  }

export default ThreeToggleButtons;