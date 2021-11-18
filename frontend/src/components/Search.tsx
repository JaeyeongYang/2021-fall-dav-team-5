import React, {useState} from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";

import { InputTags } from 'react-bootstrap-tagsinput';
import 'react-bootstrap-tagsinput/dist/index.css';

import './ThreeToggleButtons';
import "./Search.css";
import ThreeToggleButtons from "./ThreeToggleButtons";
import ColorSelector from "./ColorSelector";
import ColorFilter from "./ColorFilter";

const Search = function () {    

    const [ingredient, setIngredient] = useState('');    
    const [ingredient_list, setIngredientList] = useState('');

    const [state, setState] = useState<string[]>([]);

    const editIngredientList = (e: any) => {
        console.log(ingredient);
        ingredientListSetter(ingredient);
        e.target.value = '';
    }
    
    const initIngredientList = () => {
        setIngredientList('')
    }

    const ingredientListSetter = (s:string)  => {
        if(ingredient_list == ''){
            setIngredientList(s);
        } else {
            setIngredientList(ingredient_list + ', ' + s);
        }
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
                        onChange={(e) => setIngredient(e.target.value)}
                        onKeyPress={ (e) => { if(e.key=='Enter') {editIngredientList(e)}}}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={initIngredientList}>
                        Delete All
                        </Button>
                    </InputGroup>
                </Col>
                
                <Col md="4">                
                    <ThreeToggleButtons/>
                </Col>                
            </Row>

            <Row>
                <Col md="8">                
                     <p> {ingredient_list} </p>
                    {/* <Badge pill bg="primary">                        
                        참외 <Button onClick={initIngredientList}>X</Button>
                    </Badge>{' '} */}
                </Col>
                
                <Col md="4">
                    <Row>                    
                        <ColorSelector/>
                    </Row>

                    <Row>
                        <ColorFilter/>
                    </Row>
                </Col>     
                
                {/* <div>
                    <p> {ingredient_list} </p>
                    <Badge pill bg="primary">                        
                        참외 <Button onClick={initIngredientList}>X</Button>
                    </Badge>{' '}
                </div> */}
            </Row>
        </Container>
        </section>        
      );
  };

  export default Search;

