import React, {useState} from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "./Search.css";

const Search = function () {    

    const [ingredient, setIngredient] = useState('');    
    const [ingredient_list, setIngredientList] = useState('');

    const editIngredientList = () => {
        console.log(ingredient);
        ingredientListSetter(ingredient);        
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
                <Col md="10">                
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Ingredient..."
                        aria-label="Ingredient"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setIngredient(e.target.value)}
                        onKeyPress={ (e) => { if(e.key=='Enter') {editIngredientList()}}}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={editIngredientList}>
                        Search
                        </Button>
                    </InputGroup>
                </Col>
                <Col md="1">                                
                    <Button className="include-button" variant="primary" size="sm">
                        Include
                    </Button>                
                </Col>
                <Col md="1">                                
                    <Button className="exclude-button" variant="primary" size="sm">
                        Exclude
                    </Button>                
                </Col>                                
            </Row>

            <Row>
                <div>
                    <p>
                        {ingredient_list}
                    </p>
                </div>
            </Row>
        </Container>
        </section>        
      );
  };

  export default Search;

