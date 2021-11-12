import React, { useState } from 'react';
import "./App.css";

<<<<<<< HEAD
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  
  return (
    <div className="App">
      <Header></Header>      
      <Body></Body>      
=======
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import SearchHeader from "./components/SearchHeader";
import PopupWindow from "./components/PopupWindow";
import {getMenus, getAMenu} from "./api";
import {Menu} from "./Menu";
  
function App() {
  const menus = getMenus(); 
  const menu = getAMenu(1); // id: 1

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Find Dishes from Your Fridge</Navbar.Brand>
          <Navbar.Toggle />
          <Nav>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#options">Options</Nav.Link>
            <Nav.Link href="#credits">Credits</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <SearchHeader></SearchHeader>
      <PopupWindow text="Pie Chart"></PopupWindow>
>>>>>>> 0c79d81e7b319cacbe347edcc02aa6c0185073d7
    </div>
  );
}

export default App;
