import React from 'react';
import "./Header.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header() {
    return (
        // <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar className="Nav" variant="dark" sticky="top">
                <Container>
                <Navbar.Brand href="#home">Find Dishes from Your Fridge</Navbar.Brand>
                {/* <Navbar.Toggle />
                <Nav>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#options">Options</Nav.Link>
                    <Nav.Link href="#credits">Credits</Nav.Link>
                </Nav> */}
                </Container>
        </Navbar>
    );
}

export default Header;

