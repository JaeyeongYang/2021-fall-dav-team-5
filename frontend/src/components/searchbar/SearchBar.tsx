import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import SearchInput from "./SearchInput";
import "./SearchBar.css";

const SearchBar = function (props: any) {
  return (
    <section className="search-section">
      <Container className="search-section-container">
        <Row>
          <Col>
            <SearchInput />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SearchBar;
