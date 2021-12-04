import React, { useEffect, useRef, useState } from "react";
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
  setEnergyMinFilter,
  setEnergyMaxFilter,
  setProteinMinFilter,
  setProteinMaxFilter,
  setCarbMinFilter,
  setCarbMaxFilter,
  clearWayFilter,
  clearPatFilter,
  clearProteinMinFilter,
  clearProteinMaxFilter,
  clearCarbMinFilter,
  clearCarbMaxFilter,
  clearFatMinFilter,
  clearFatMaxFilter,
  clearNaMinFilter,
  clearNaMaxFilter,
  clearEnergyMinFilter,
  clearEnergyMaxFilter,
  clearHashtagFilter,
  selectFilterTerms,
  setFatMinFilter,
  setFatMaxFilter,
  setNaMinFilter,
  setNaMaxFilter,
} from "src/store/reducers/filter";
import FilterNumberInput from "./FilterTextInput";

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
  const inputRef = useRef(null);

  const plot: string = useAppSelector(selectPlot) ?? "bubble";

  // TODO: implement autocompletion for ingredients
  const ingredients = useAppSelector(selectIngredients);
  const ways = useAppSelector(selectWays);
  const pats = useAppSelector(selectPats);
  const terms = useAppSelector(selectSearchTerms);
  const wayFilter = useAppSelector(selectWayFilter);
  const patFilter = useAppSelector(selectPatFilter);
  const dispatch = useAppDispatch();
  const filterTerms = useAppSelector(selectFilterTerms);

  /////

  const radios = [
    { value: Mode.menu, label: "Menu", variant: "outline-success" },
    { value: Mode.ing_inc, label: "Have it", variant: "outline-primary" },
    { value: Mode.ing_exc, label: "Don't have", variant: "outline-danger" },
  ];

  const radios_visual = [
    { value: Show.bubble, label: "Bubble Plot", variant: "outline-primary" },
    { value: Show.scatter, label: "Scatter Plot", variant: "outline-primary" },
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
    setValue("");
    dispatch(clearSearchTerm());
    dispatch(clearWayFilter());
    dispatch(clearPatFilter());
    dispatch(clearEnergyMinFilter());
    dispatch(clearEnergyMaxFilter());
    dispatch(clearCarbMinFilter());
    dispatch(clearCarbMaxFilter());
    dispatch(clearProteinMinFilter());
    dispatch(clearProteinMaxFilter());
    dispatch(clearFatMinFilter());
    dispatch(clearFatMaxFilter());
    dispatch(clearNaMinFilter());
    dispatch(clearNaMaxFilter());
    dispatch(clearHashtagFilter());
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
      setValue("");
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
    dispatch(setPlot(e.currentTarget.value));
  };

  const FilterRow = ({
    label,
    minValue,
    setMinReducer,
    maxValue,
    setMaxReducer,
  }: any) => {
    return (
      <Row style={{ marginTop: "0.5rem" }}>
        <Col md="4">
          <FilterNumberInput
            stateValue={minValue}
            setStateValue={(v) => dispatch(setMinReducer(v))}
            placeholder="Min"
          />
        </Col>
        <Col md="4" style={{ padding: ".375rem .75rem" }}>
          ≤ {label} ≤
        </Col>
        <Col md="4">
          <FilterNumberInput
            stateValue={maxValue}
            setStateValue={(v) => dispatch(setMaxReducer(v))}
            placeholder="Max"
          />
        </Col>
      </Row>
    );
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Row
        style={{
          marginLeft: "0.25rem",
          marginRight: "0.25rem",
          marginBottom: "1rem",
          width: "100%",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <ToggleButtonGroup
          name="toggle-two"
          type="radio"
          defaultValue={Show.bubble}
          className="bubble-scatter-toggle-buttons"
        >
          {radios_visual.map((x, idx) => (
            <ToggleButton
              key={1000 + idx}
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
      </Row>
      <Row>
        <div className="search-input">
          <Form onSubmit={(e) => submitTerm(e)}>
            <InputGroup>
              <Row style={{ margin: "0.25rem", width: "100%" }}>
                <Form.Control
                  value={value}
                  placeholder="Ingredient or Menu..."
                  aria-label="Ingredient"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => onKeyPress(e)}
                />
              </Row>
              <Row style={{ margin: "0.25rem", width: "100%" }}>
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
      <Row style={{ marginTop: "1rem" }}>
        <Col
          md="6"
          style={{ display: "block", flexDirection: "row", textAlign: "left" }}
        >
          <Form.Label style={{ paddingLeft: "1.5rem" }}>
            <b>조리방법</b>
          </Form.Label>
          {ways &&
            ways.map((w, i) => {
              return (
                <Form.Check
                  style={{ textAlign: "left", marginTop: "0.5rem" }}
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
        <Col
          md="6"
          style={{ display: "block", flexDirection: "row", textAlign: "left" }}
        >
          <Form.Label style={{ paddingLeft: "1.5rem" }}>
            <b>메뉴종류</b>
          </Form.Label>
          {pats &&
            pats.map((p, i) => {
              return (
                <Form.Check
                  style={{ textAlign: "left", marginTop: "0.5rem" }}
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

      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Row>
          <b>영양범위</b>
        </Row>

        <FilterRow
          label={"칼로리"}
          minValue={filterTerms.energy_min}
          maxValue={filterTerms.energy_max}
          setMinReducer={setEnergyMinFilter}
          setMaxReducer={setEnergyMaxFilter}
        />
        <FilterRow
          label={"탄수화물"}
          minValue={filterTerms.carb_min}
          maxValue={filterTerms.carb_max}
          setMinReducer={setCarbMinFilter}
          setMaxReducer={setCarbMaxFilter}
        />
        <FilterRow
          label={"단백질"}
          minValue={filterTerms.protein_min}
          maxValue={filterTerms.protein_max}
          setMinReducer={setProteinMinFilter}
          setMaxReducer={setProteinMaxFilter}
        />
        <FilterRow
          label={"지방"}
          minValue={filterTerms.fat_min}
          maxValue={filterTerms.fat_max}
          setMinReducer={setFatMinFilter}
          setMaxReducer={setFatMaxFilter}
        />
        <FilterRow
          label={"나트륨"}
          minValue={filterTerms.na_min}
          maxValue={filterTerms.na_max}
          setMinReducer={setNaMinFilter}
          setMaxReducer={setNaMaxFilter}
        />
      </div>
      <Row style={{ margin: "0.25rem", width: "100%" }}>
        <Button
          variant="secondary"
          id="search-input-clear-button"
          onClick={() => clearTerms()}
        >
          Clear all filters
        </Button>
      </Row>
    </Container>
  );
};

export default SearchInput;
