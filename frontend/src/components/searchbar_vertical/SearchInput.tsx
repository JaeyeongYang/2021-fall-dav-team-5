import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  CloseButton,
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  loadMenus,
  selectIngredients,
  selectPats,
  selectWays,  
} from "src/store/reducers/data";
import {
  addPatFilter,
  addSearchTerm,
  addWayFilter,
  clearSearchTerm,
  isEqualSearchTerm,
  removePatFilter,
  removeSearchTerm,
  removeWayFilter,
  SearchTerm,
  SearchTermType,
  selectPatFilter,
  selectSearchTerms,
  selectWayFilter,
  setPlot,
  selectPlot,
} from "src/store/reducers/filter";

import "./SearchInput.css";

enum Mode {
  menu = "menu",
  ing_inc = "ing_inc",
  ing_exc = "ing_exc",
}

const termToMode = (term: SearchTerm) => {
  return term.type === SearchTermType.menu
    ? Mode.menu
    : term.excluded ?? false
    ? Mode.ing_exc
    : Mode.ing_inc;
};

const getBadgeBg = (m: Mode) => {
  switch (m) {
    case Mode.menu:
      return "success";
    case Mode.ing_inc:
      return "primary";
    case Mode.ing_exc:
      return "danger";
    default:
      return "primary";
  }
};

enum Show {
  bubble = "bubble",
  scatter = "scatter",
}

const SearchInput = (props: any) => {
  const [mode, setMode] = useState<string>(Mode.menu);
  const [value, setValue] = useState<string>("");

  const plot: string = useAppSelector(selectPlot) ?? 'bubble';


  // TODO: implement autocompletion for ingredients
  const ingredients = useAppSelector(selectIngredients);
  const ways = useAppSelector(selectWays);
  const pats = useAppSelector(selectPats);
  const terms = useAppSelector(selectSearchTerms);
  const wayFilter = useAppSelector(selectWayFilter);
  const patFilter = useAppSelector(selectPatFilter);
  const dispatch = useAppDispatch();

  /////  

  const radios = [
    { value: Mode.menu, label: "Menu", variant: "outline-success" },
    { value: Mode.ing_inc, label: "Have it", variant: "outline-primary" },
    { value: Mode.ing_exc, label: "Don't have", variant: "outline-danger" },
  ];

  const radios_visual = [
    { value: Show.bubble, label: "Bubble Plot", variant: "outline-primary" },
    { value: Show.scatter, label: "Scatter Plot", variant: "outline-primary" }    
  ]

  useEffect(() => {
    console.log("Current mode:", mode);
  }, [mode]);

  const addTerm = (term: SearchTerm) => {
    dispatch(addSearchTerm(term));
    dispatch(loadMenus());
  };
  const removeTerm = (term: SearchTerm) => {
    dispatch(removeSearchTerm(term));
    dispatch(loadMenus());
  };
  const clearTerms = () => {
    dispatch(clearSearchTerm());
    dispatch(loadMenus());
  };

  const submitTerm = (e: any) => {
    e.preventDefault();
    const term = {
      name: e.target[0].value.trim(),
      type:
        mode === Mode.menu ? SearchTermType.menu : SearchTermType.ingredient,
      isParsed: false,
      excluded: mode !== Mode.menu ? mode === Mode.ing_exc : undefined,
    };

    if (terms?.filter((x) => isEqualSearchTerm(x, term)).length === 0) {
      addTerm(term);
      e.target.value = "";
    }
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Backspace" && value === "") {
      if (terms && terms?.length > 0) {
        removeTerm(terms[terms.length - 1]);
      }
    }
  };

  const onShowButtonClick = (e: any) => {    
    dispatch(setPlot(e.currentTarget.value))
  };

  return (
    <Container style={{display: "flex", flexDirection: "column", height:"100%"}}>
      <Row>
        <div className="search-input">
          <Form onSubmit={(e) => submitTerm(e)}>
            <InputGroup>              
              <Row style={{margin:"0.25rem", width: "100%"}}>                                                         
                <Form.Control
                  placeholder="Ingredient or Menu..."
                  aria-label="Ingredient"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => onKeyPress(e)}
                />                                                
              </Row>
              <Row style={{margin: "0.25rem", width: "100%"}}>                                                
                <ToggleButtonGroup                    
                    name="toggle-three"
                    type="radio"
                    defaultValue={Mode.menu}
                    className="search-input-toggle-buttons"
                  >
                    {radios.map((x, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${x.value}`}
                        name="radio"
                        variant={x.variant}
                        value={x.value}
                        checked={x.value === mode}
                        onChange={(e) => setMode(e.currentTarget.value)}
                      >
                        {x.label}
                      </ToggleButton>
                    ))}
                </ToggleButtonGroup>                
              </Row>
              <Row style={{margin:"0.25rem", width: "100%"}}>
                <Button
                    variant="secondary"
                    id="search-input-clear-button"
                    onClick={() => clearTerms()}
                  >
                    Delete All
                </Button>                
              </Row>                                       
            </InputGroup>
          </Form>
          <div className="search-input-terms">
            {terms?.map((term, index) => {
              const m = termToMode(term);
              return (
                <Badge bg={getBadgeBg(m)} key={index}>
                  {term.name}
                  <CloseButton onClick={() => removeTerm(term)} />
                </Badge>
              );
            })}
          </div>
        </div>
      </Row>
      <Row style={{marginTop: "1rem"}}>        
        <Col md="6" style={{ display: "block", flexDirection: "row", textAlign: "left"}}>
          <Form.Label style={{paddingLeft: "1.5rem"}}><b>조리방법</b></Form.Label>
          {ways &&
            ways.map((w, i) => {
              return (                
                <Form.Check
                  style={{ textAlign: "left", marginTop: "0.5rem"}}
                  key={i}
                  id={`way-${i}-${w[0]}`}
                  label={`${w[0]} (${w[1]})`}
                  checked={wayFilter?.some((x) => x === w[0])}
                  onChange={(e) => {
                    if (!wayFilter?.some((x) => x === w[0])) {
                      dispatch(addWayFilter(w[0]));
                    } else {
                      dispatch(removeWayFilter(w[0]));
                    }
                  }}
                />                
              );
            })}
        </Col>
        <Col md="6" style={{ display: "block", flexDirection: "row", textAlign: "left"}}>
          <Form.Label style={{paddingLeft: "1.5rem"}}><b>메뉴종류</b></Form.Label>
          {pats &&
            pats.map((p, i) => {
              return (                
                <Form.Check
                  style={{ textAlign: "left", marginTop: "0.5rem"}}  
                  key={i}
                  id={`pat-${i}-${p[0]}`}
                  label={`${p[0]} (${p[1]})`}
                  checked={patFilter?.some((x) => x === p[0])}
                  onChange={(e) => {
                    if (!patFilter?.some((x) => x === p[0])) {
                      dispatch(addPatFilter(p[0]));
                    } else {
                      dispatch(removePatFilter(p[0]));
                    }
                  }}
                />                
              );
            })}
        </Col>
      </Row>

      <Row style={{marginTop: "2rem", marginBottom: "2rem"}}>
        <Row><b>영양범위</b></Row>
        
        <Row style={{marginTop: "0.5rem"}}>
          <Col md="4">          
            <Form.Control
              placeholder="Min"           
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
          <Col md="4" style={{padding: ".375rem .75rem"}}>                     
           ≤ 칼로리 ≤           
          </Col>
          <Col md="4">          
            <Form.Control
              placeholder="Max"              
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
        </Row>

        <Row style={{marginTop: "0.5rem"}}>
          <Col md="4">          
            <Form.Control
              placeholder="Min"           
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
          <Col md="4" style={{padding: ".375rem .75rem"}}>                     
           ≤ 탄수화물 ≤           
          </Col>
          <Col md="4">          
            <Form.Control
              placeholder="Max"              
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
        </Row>

        <Row style={{marginTop: "0.5rem"}}>
          <Col md="4">          
            <Form.Control
              placeholder="Min"           
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
          <Col md="4" style={{padding: ".375rem .75rem"}}>                     
           ≤ 단백질 ≤           
          </Col>
          <Col md="4">          
            <Form.Control
              placeholder="Max"              
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
        </Row>

        <Row style={{marginTop: "0.5rem"}}>
          <Col md="4">          
            <Form.Control
              placeholder="Min"           
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
          <Col md="4" style={{padding: ".375rem .75rem"}}>                     
           ≤ 지방 ≤           
          </Col>
          <Col md="4">          
            <Form.Control
              placeholder="Max"              
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
        </Row>

        <Row style={{marginTop: "0.5rem"}}>
          <Col md="4">          
            <Form.Control
              placeholder="Min"           
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
          <Col md="4" style={{padding: ".375rem .75rem"}}>                     
           ≤ 나트륨 ≤           
          </Col>
          <Col md="4">          
            <Form.Control
              placeholder="Max"              
              aria-describedby="basic-addon2"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => onKeyPress(e)}
            />
          </Col>
        </Row>
      </Row>
      
      <div style={{marginTop: "auto", 
        marginLeft: "0.25rem", 
        marginRight: "0.25rem", 
        width: "100%",
        display: "flex",
        flexFlow: "column"}}>                
        <ToggleButtonGroup                    
            name="toggle-two"
            type="radio"
            defaultValue={Show.bubble}
            className="bubble-scatter-toggle-buttons"
          >
            {radios_visual.map((x, idx) => (
              <ToggleButton
                key={1000+idx}
                id={`radio-visual-${x.value}`}
                name="radio-visual"
                variant={x.variant}
                value={x.value}
                checked={x.value === plot}
                onChange={(e) => onShowButtonClick(e)}
              >
                {x.label}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </div>    

    </Container>
  );
};

export default SearchInput;
