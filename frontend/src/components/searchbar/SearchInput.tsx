import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  CloseButton,
  Container,
  Form,
  InputGroup,
  Row,
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

const SearchInput = (props: any) => {
  const [mode, setMode] = useState<string>(Mode.menu);
  const [value, setValue] = useState<string>("");

  // TODO: implement autocompletion for ingredients
  const ingredients = useAppSelector(selectIngredients);
  const ways = useAppSelector(selectWays);
  const pats = useAppSelector(selectPats);
  const terms = useAppSelector(selectSearchTerms);
  const wayFilter = useAppSelector(selectWayFilter);
  const patFilter = useAppSelector(selectPatFilter);
  const dispatch = useAppDispatch();

  const radios = [
    { value: Mode.menu, label: "Menu", variant: "outline-success" },
    { value: Mode.ing_inc, label: "Have it", variant: "outline-primary" },
    { value: Mode.ing_exc, label: "Don't have", variant: "outline-danger" },
  ];

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

  return (
    <Container>
      <Row>
        <div className="search-input">
          <Form onSubmit={(e) => submitTerm(e)}>
            <InputGroup>
              <Form.Control
                placeholder="Ingredient or Menu..."
                aria-label="Ingredient"
                aria-describedby="basic-addon2"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => onKeyPress(e)}
              />
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
              <Button
                variant="secondary"
                id="search-input-clear-button"
                onClick={() => clearTerms()}
              >
                Delete All
              </Button>
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
      <Row>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Form.Label>조리방법</Form.Label>
          {ways &&
            ways.map((w, i) => {
              return (
                <Form.Check
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
        </div>
      </Row>
      <Row>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Form.Label>메뉴종류</Form.Label>
          {pats &&
            pats.map((p, i) => {
              return (
                <Form.Check
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
        </div>
      </Row>
    </Container>
  );
};

export default SearchInput;
