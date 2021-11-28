import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

import "./Footer.css";

const ScatterPlotMenu = function ({
    xAxis,
    yAxis,
    setXAxis,
    setYAxis,
    onAlignButtonClick,
    onResetButtonClick
}:{
    xAxis: string,
    yAxis: string,
    setXAxis: React.Dispatch<React.SetStateAction<string>>,
    setYAxis: React.Dispatch<React.SetStateAction<string>>,
    onAlignButtonClick: (e: any) => void,
    onResetButtonClick: (e: any) => void
}){    
    interface Axis {
        [key: string]: string;
    }

    const nutrition_map_x: Axis = {
        'x-axis': 'X-axis',        
        'energy': 'X: Cal',
        'carb': 'X: Carb',
        'protein': 'X: Prot',
        'fat': 'X: Fat',
        'na': 'X: Salt'
    }
    
    const nutrition_map_y: Axis = {
        'y-axis': 'Y-axis',        
        'energy': 'Y: Cal',
        'carb': 'Y: Carb',
        'protein': 'Y: Prot',
        'fat': 'Y: Fat',
        'na': 'Y: Salt'
    }

    return (
        <div className="scatter-plot-menu">          
          <section>
            <Container>            
            <Row>
                <Col md="8">
                </Col>
                <Col md="1">
                    <Dropdown onSelect={(eventKey)=>setXAxis(eventKey+'')}>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" style={{width: '100%'}}>
                            {nutrition_map_x[xAxis]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="x-axis">Reset</Dropdown.Item>                        
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="energy">Calory</Dropdown.Item>                        
                            <Dropdown.Item eventKey="carb">Carbohydrate</Dropdown.Item>
                            <Dropdown.Item eventKey="protein">Protein</Dropdown.Item>
                            <Dropdown.Item eventKey="fat">Fat</Dropdown.Item>                        
                            <Dropdown.Item eventKey="na">Salt</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>               
                </Col>

                <Col md="1">
                    <Dropdown onSelect={(eventKey)=>setYAxis(eventKey+'')}>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" style={{width: '100%'}}>
                            {nutrition_map_y[yAxis]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="y-axis">Reset</Dropdown.Item>                        
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="energy">Calory</Dropdown.Item>                        
                            <Dropdown.Item eventKey="carb">Carbohydrate</Dropdown.Item>
                            <Dropdown.Item eventKey="protein">Protein</Dropdown.Item>
                            <Dropdown.Item eventKey="fat">Fat</Dropdown.Item>                        
                            <Dropdown.Item eventKey="na">Salt</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>                     
                </Col>
                
                <Col md="2">
                <div className="d-grid">
                <ButtonGroup>                
                    <Button variant="primary" size="sm" onClick={(e) => onAlignButtonClick(e)}>
                        Align
                    </Button>

                    <Button variant="success" size="sm" onClick={(e) => onResetButtonClick(e)}>
                        Reset
                    </Button>
                </ButtonGroup>
                </div>
                </Col>                
            </Row>
            </Container>
          </section>
        </div>
      )
}

export default ScatterPlotMenu;