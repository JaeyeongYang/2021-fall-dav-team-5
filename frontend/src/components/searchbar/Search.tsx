import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Badge from "react-bootstrap/Badge";
import CloseButton from "react-bootstrap/CloseButton";

import "react-bootstrap-tagsinput/dist/index.css";
import "./Search.css";
import ThreeToggleButtons from "./ThreeToggleButtons";
import ColorSelector from "src/components/ColorSelector";
import { Tag, BubbleColors } from "src/store/reducers/data";
import SearchInput from "./SearchInput";

interface Props {
  searchOnKeyPress: (e: any) => void;
  searchOnChange: (e: any) => void;
  searchInitLists: () => void;
  getAllList: () => Tag[];
  getRadioValue: () => string;
  setThreeToggleValue: (s: string) => void;
  deleteIngredientOrMenu: (e: any) => void;
  bubbleColors: BubbleColors[];
  bubbleColorValue: string;
  setBubbleColorValue: React.Dispatch<React.SetStateAction<string>>;
  menuCategory: string;
  howToCook: string;
  setMenuCategory: React.Dispatch<React.SetStateAction<string>>;
  setHowToCook: React.Dispatch<React.SetStateAction<string>>;
}

const Search = function (props: any) {
  const setTagColor = (s: string) => {
    if (s == "1") {
      return "primary";
    } else if (s == "2") {
      return "danger";
    } else {
      return "success";
    }
  };

  return (
    <section className="search-section">
      <Container className="search-section-container">
        <Row>
          <Col>
            <SearchInput />
          </Col>
        </Row>
        {/* <Row>
          <Col md="8">
            {getAllList().map((tag, idx) => (
              <span>
                <Badge
                  pill
                  bg={setTagColor(tag.radioValue)}
                  style={{ fontSize: 16 }}
                >
                  {tag.ingredientOrMenu} &nbsp;
                  <CloseButton
                    name={tag.ingredientOrMenu}
                    id={tag.radioValue}
                    variant="white"
                    style={{ fontSize: 12 }}
                    onClick={deleteIngredientOrMenu}
                    // onClick={(e)=>{
                    //     const element = e.target as HTMLButtonElement;
                    //     console.log(element.id);
                    //     console.log(element.name);}
                    //     }
                  />
                </Badge>{" "}
                &nbsp;
              </span>
            ))}
          </Col>
            </Row>*/}
      </Container>
    </section>
  );
};

export default Search;
