import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import SearchInput from "./SearchInput";
import "./SearchBar.css";

const SearchBar = function (props: any) {
  return (
    <section className="search-section">
      <SearchInput />
    </section>
  );
};

export default SearchBar;
