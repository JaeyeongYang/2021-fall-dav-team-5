import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./Footer.css";

function ScatterPlotMenu(){

    return (
        <footer className="scatter-plot-menu">          
          <section className="scatter-plot-menu-contents">
            <Container className="scatter-plot-menu-container">
            <Row>
            <Col>
                <InputGroup.Text>X-axis</InputGroup.Text>
                    <DropdownButton variant="light" title="Nutrient">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col>
            <InputGroup.Text>Y-axis</InputGroup.Text>
                    <DropdownButton variant="light" title="Nutrient">
                        <Dropdown.Item href="#">Calory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                        <Dropdown.Item href="#">Protein</Dropdown.Item>
                        <Dropdown.Item href="#">Fat</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Sodium</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col>
            <div className="d-grid">
                <Button variant="primary" size="sm">
                    Align
                </Button>
            </div>
            </Col>            
            </Row>
            </Container>
          </section>
        </footer>
      )
}

export default ScatterPlotMenu;