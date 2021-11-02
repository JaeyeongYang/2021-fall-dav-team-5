import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./SearchHeader.css";

const SearchHeader = function ({}) {
  return (
    <>
      <header className="search-header">
        <Container className="search-header-container">
          <Row>
            <Col lg={6}>
              <InputGroup size="sm" className="mt-3 mb-3">
                <InputGroup.Text>Menu name</InputGroup.Text>
                <FormControl aria-label="Small" />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Ingredients to include</InputGroup.Text>
                <FormControl aria-label="Small" />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Ingredients to exclude</InputGroup.Text>
                <FormControl aria-label="Small" />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Nutrition condition</InputGroup.Text>
                <DropdownButton variant="light" title="Nutrient">
                  <Dropdown.Item href="#">Carbohydrate</Dropdown.Item>
                  <Dropdown.Item href="#">Protein</Dropdown.Item>
                  <Dropdown.Item href="#">Fat</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Sodium</Dropdown.Item>
                </DropdownButton>
                <InputGroup.Text>should be</InputGroup.Text>
                <DropdownButton variant="light" title="comparison">
                  <Dropdown.Item href="#">equal to</Dropdown.Item>
                  <Dropdown.Item href="#">not equal to</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">greater than</Dropdown.Item>
                  <Dropdown.Item href="#">greater or equal to</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">less than</Dropdown.Item>
                  <Dropdown.Item href="#">less or equal to</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-label="Small" />
                <InputGroup.Text>g</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col lg={6}>
              <InputGroup size="sm" className="mt-3 mb-3">
                <InputGroup.Text>Cook category</InputGroup.Text>
                <FormControl aria-label="Small" />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Recipe</InputGroup.Text>
                <FormControl aria-label="Small" />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Hashtag</InputGroup.Text>
                <FormControl aria-label="Small" />
              </InputGroup>
              <div className="d-grid">
                <Button variant="primary" size="sm">
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default SearchHeader;
