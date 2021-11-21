import React, {useEffect, useState} from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";

import 'react-bootstrap-tagsinput/dist/index.css';
import "./Search.css";
import ThreeToggleButtons from "./ThreeToggleButtons";
import ColorSelector from "./ColorSelector";
import ColorFilter from "./ColorFilter";
import { Tag } from "../interfaces";

const Search = function ({  
    searchOnKeyPress,
    searchOnChange,
    searchInitLists,
    getAllList,
  
    getRadioValue,
    setThreeToggleValue
  }:{
    searchOnKeyPress: (e: any) => void,
    searchOnChange: (e: any) => void,
    searchInitLists: () => void,
    getAllList: () => Tag[],
  
    getRadioValue: () => string,
    setThreeToggleValue: (s: string) => void
  }) {             
    
    const setTagColor = (s:string) => {
        if (s == '1') {return 'primary'}
        else if (s=='2') {return 'danger'}
        else {return 'success'}
    }

    return (
        <section className="search-section">
        <Container className="search-section-container">
            <Row>
                <Col md="8">                
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Ingredient or Menu..."
                        aria-label="Ingredient"
                        aria-describedby="basic-addon2"
                        onChange={(e) => searchOnChange(e)}
                        onKeyPress={ (e) => searchOnKeyPress(e) }
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={searchInitLists}>
                        Delete All
                        </Button>
                    </InputGroup>
                </Col>
                
                <Col md="4">                
                    <ThreeToggleButtons
                        getRadioValue={getRadioValue}
                        setThreeToggleValue={setThreeToggleValue}
                    ></ThreeToggleButtons>
                </Col>                
            </Row>

            <Row>
                <Col md="8">                                                                   
                {getAllList().map((tag,idx) => (            
                    <Badge pill bg={setTagColor(tag.radioValue)}>
                        {tag.ingredientOrMenu}
                    </Badge>                    
                ))}                    
                </Col>
                
                <Col md="4">
                    <Row>                    
                        <ColorSelector/>
                    </Row>
                    
                    <Row>
                        <ColorFilter/>
                    </Row>
                </Col>                                 
            </Row>
        </Container>
        </section>        
      );
  };

  export default Search;
  

