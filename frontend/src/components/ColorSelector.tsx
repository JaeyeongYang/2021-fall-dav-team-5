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

function ColorSelector(){    
    const [bubbleColorValue, setBubbleColorValue] = useState('10');
  
    const bubbleColors = [
      { name: 'Menu Category', value: '10', color: 'outline-info'},
      { name: 'How to Cook', value: '11', color: 'outline-info'},      
    ]; 


    return (
        <div className="d-grid">
            {/* <ButtonGroup> */}
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
                                
                {/* <Dropdown>                                                
                    <Dropdown.Toggle variant="outline-primary" title="" style={{width: '100%'}}></Dropdown.Toggle>                                            
                    <Dropdown.Menu>
                        <Dropdown.Item href="#"><span>●</span> 밥</Dropdown.Item>                                
                        <Dropdown.Item href="#">● 찌개</Dropdown.Item>
                        <Dropdown.Item href="#">● 반찬</Dropdown.Item>
                        <Dropdown.Item href="#">● 후식</Dropdown.Item>                                                            
                    </Dropdown.Menu>                        
                </Dropdown> */}
                
            {/* </ButtonGroup> */}
        </div>

        // <section>
        //     <Container>            
        //         <Row>
        //             <Col md="9">
        //             </Col>                    

        //             <Col md="3">
        //                 <ListGroup defaultActiveKey="#link1">
        //                     <ListGroup.Item action href="#link1">                            
        //                         Color by Menu Category                                                    
        //                     </ListGroup.Item>
                            
        //                     <ListGroup.Item action href="#link2">
        //                         Color by How to Cook
        //                     </ListGroup.Item>                                                      
        //                 </ListGroup>                        

        //                 <Dropdown>                                                
        //                     <Dropdown.Toggle variant="outline-primary" title="" style={{width: '100%'}}>
        //                     </Dropdown.Toggle>                        
        //                     <Dropdown.Menu>
        //                         <Dropdown.Item href="#"><span>●</span> 밥</Dropdown.Item>                                
        //                         <Dropdown.Item href="#">● 찌개</Dropdown.Item>
        //                         <Dropdown.Item href="#">● 반찬</Dropdown.Item>
        //                         <Dropdown.Item href="#">● 후식</Dropdown.Item>                                                            
        //                     </Dropdown.Menu>                        
        //                 </Dropdown>    
        //             </Col>                                         
        //         </Row>
        //     </Container>
        //   </section>
    )
}

export default ColorSelector;