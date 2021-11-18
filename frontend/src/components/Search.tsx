import React, {useEffect, useState} from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";

import { InputTags } from 'react-bootstrap-tagsinput';
import 'react-bootstrap-tagsinput/dist/index.css';
import "./Search.css";
import ThreeToggleButtons from "./ThreeToggleButtons";
import { exportRadioValue } from './ThreeToggleButtons';
import ColorSelector from "./ColorSelector";
import ColorFilter from "./ColorFilter";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { createHeritageClause } from "typescript";

interface Tag {
    ingredient_or_menu: string;
    exportRadioValue: string;    
}

let tags: any;

const Search = function () {    

    const [ingredient_or_menu, setIngredientOrMenu] = useState('');    
    const [ingredient_list, setIngredientList] = useState<string[]>([]);
    const [ingredient_not_list, setIngredientNotList] = useState<string[]>([]);
    const [menu_list, setMenuList] = useState<string[]>([]);
    const [all_list, setAllList] = useState<Tag[]>([]);    

    const editLists = (e: any) => {        
        if (exportRadioValue == '1') {
            setIngredientList(oldArray => [...oldArray, ingredient_or_menu]);
            // setIngredientList(ingredient_list);
        } else if (exportRadioValue == '2') {
            setIngredientNotList(oldArray => [...oldArray, ingredient_or_menu]);
        } else {
            setMenuList(oldArray => [...oldArray, ingredient_or_menu]);                        
        }
        
        setAllList(oldArray => [...oldArray, {
            ingredient_or_menu: ingredient_or_menu, 
            exportRadioValue: exportRadioValue}
        ]);
        
        e.target.value = ''; // initialize input bar
    }    
    
    const setTagColor = (s:string) => {
        if (s == '1') {return 'primary'}
        else if (s=='2') {return 'danger'}
        else {return 'success'}
    }

    const createTags = (all_list:Tag[]) => {
        return all_list.map((tag,idx) => (            
                <Badge pill bg={setTagColor(tag.exportRadioValue)}>
                    {tag.ingredient_or_menu}
                </Badge>                    
            ));
    }

    const initLists = () => {
        setIngredientList([]);        
        setIngredientNotList([]);        
        setMenuList([]);        
        setAllList([]);            
    }     

    useEffect(()=>{        
        console.log('=========================')
        console.log('ingredient_list:', ingredient_list);
        console.log('ingredient_not_list:', ingredient_not_list);
        console.log('menu_list:', menu_list);
        console.log('all_list:', all_list);                
    }, [ingredient_list, ingredient_not_list, menu_list, all_list]);

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
                        onChange={(e) => setIngredientOrMenu(e.target.value)}
                        onKeyPress={ (e) => { if(e.key=='Enter') { editLists(e) } } }
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={initLists}>
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

                {/* {tags} */}
                {all_list.map((tag,idx) => (            
                    <Badge pill bg={setTagColor(tag.exportRadioValue)}>
                        {tag.ingredient_or_menu}
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
  

