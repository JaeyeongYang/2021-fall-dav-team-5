import React, {useState} from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";


const ColorFilter = function({
    bubbleColorValue,
    
    menuCategory,
    howToCook,
    setMenuCategory,
    setHowToCook
}:{
    bubbleColorValue: string,
    
    menuCategory: string,
    howToCook: string,
    setMenuCategory: React.Dispatch<React.SetStateAction<string>>,
    setHowToCook: React.Dispatch<React.SetStateAction<string>>
}){    
    let dropdown;
    if (bubbleColorValue == '10') {
        dropdown = <Dropdown onSelect={(eventKey)=>setMenuCategory(eventKey+'')}>                                                
                        <Dropdown.Toggle variant="outline-info" size="sm" style={{width: '100%'}}>
                            {menuCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Show All"><span>●</span> Show All</Dropdown.Item>
                            <Dropdown.Item eventKey="밥"><span style={{color: '#FFCEC7'}}>●</span> 밥 </Dropdown.Item>
                            <Dropdown.Item eventKey="국&찌개"><span style={{color: '#FBDEA2'}}>●</span> 국&찌개 </Dropdown.Item>
                            <Dropdown.Item eventKey="반찬"><span style={{color: '#B6DEE7'}}>●</span> 반찬 </Dropdown.Item>
                            <Dropdown.Item eventKey="일품"><span style={{color: '#9ADBC7'}}>●</span> 일품 </Dropdown.Item>
                            <Dropdown.Item eventKey="후식"><span style={{color: '#C9CBE0'}}>●</span> 후식 </Dropdown.Item>
                            <Dropdown.Item eventKey="기타"><span style={{color: '#E2E2E2'}}>●</span> 기타 </Dropdown.Item>
                        </Dropdown.Menu>                        
                    </Dropdown>;

        setHowToCook('Show All');
    } else {
        dropdown = <Dropdown onSelect={(eventKey)=>setHowToCook(eventKey+'')}>                                                
                        <Dropdown.Toggle variant="outline-info" size="sm" style={{width: '100%'}}>
                            {howToCook}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Show All"><span>●</span> Show All</Dropdown.Item>
                            <Dropdown.Item eventKey="굽기"><span style={{color: '#FFCEC7'}}>●</span> 굽기 </Dropdown.Item>
                            <Dropdown.Item eventKey="끓이기"><span style={{color: '#FBDEA2'}}>●</span> 끓이기 </Dropdown.Item>
                            <Dropdown.Item eventKey="볶기"><span style={{color: '#B6DEE7'}}>●</span> 볶기 </Dropdown.Item>
                            <Dropdown.Item eventKey="찌기"><span style={{color: '#9ADBC7'}}>●</span> 찌기 </Dropdown.Item>
                            <Dropdown.Item eventKey="튀기기"><span style={{color: '#C9CBE0'}}>●</span> 튀기기 </Dropdown.Item>
                            <Dropdown.Item eventKey="기타"><span style={{color: '#E2E2E2'}}>●</span> 기타 </Dropdown.Item>
                        </Dropdown.Menu>                        
                    </Dropdown>;
        
        setMenuCategory('Show All');
    }
    return (
        <div className="d-grid">                                            
            {dropdown}                           
        </div>
    )
}

export default ColorFilter;