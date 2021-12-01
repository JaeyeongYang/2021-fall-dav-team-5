import React from "react";
import "./Header.css";

import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    // <Navbar bg="dark" variant="dark" sticky="top">
    <Navbar className="Nav" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Find Dishes from Your Fridge</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
