import React, {useState} from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./Footer.css";

function ScatterPlotMenu(){

    const [x_axis, setXAxis] = useState('');    
    const [y_axis, setYAXis] = useState('');

    return (
        <footer className="scatter-plot-menu">          
          <section>
            <Container>            
            <Row>
                <Col md="8">
                </Col>
                <Col md="1">
                    <DropdownButton variant="outline-secondary" title="X-Axis&nbsp;&nbsp;" drop="up" size="sm" className="scatter-plot-dropdown">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                    </DropdownButton>                    
                </Col>

                <Col md="1">
                    <DropdownButton variant="outline-secondary" title="Y-Axis&nbsp;&nbsp;" drop="up" size="sm">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                    </DropdownButton>  
                </Col>
                
                <Col md="2">
                <div className="d-grid">
                <ButtonGroup>                
                    <Button variant="primary" size="sm">
                        Align
                    </Button>

                    <Button variant="success" size="sm">
                        Reset
                    </Button>
                </ButtonGroup>
                </div>
                </Col>
                {/* <Col md="1">            
                    <DropdownButton variant="secondary" title="Y-Axis&nbsp;&nbsp;" drop="up" size="sm">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                    </DropdownButton>            
                </Col>
                <Col md="1">
                    <div className="d-grid">
                    <Button variant="primary" size="sm">
                        Align
                    </Button>
                    </div>
                </Col>
                <Col md="1">
                    <div className="d-grid">
                    <Button variant="success" size="sm">
                        Reset
                    </Button>
                    </div>
                </Col>                */}
            </Row>
            </Container>
          </section>
        </footer>
      )
}

export default ScatterPlotMenu;