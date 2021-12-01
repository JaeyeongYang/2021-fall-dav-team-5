import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Image } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  clearMenuDetail,
  loadMenuDetail,
  selectMenuDetail,
  MenuDetail,
  Recipe
} from "src/store/reducers/data";
import PieSVG from "./PieSVG";
import {
  hideModal,
  selectDisplayModal,
  showModal,
} from "src/store/reducers/UI";

const ModalComponent = function () {
  const menuDetail: MenuDetail | null =
    useAppSelector(selectMenuDetail) ?? null;
  const displayModal: boolean = useAppSelector(selectDisplayModal) ?? false;
  const dispatch = useAppDispatch();

  /////// modal
  const handleClose = () => dispatch(hideModal);

  if (menuDetail === null) return <></>;

  return (
    <Modal
      show={displayModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {menuDetail.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="modal-component-row">
            <Col md="6" style={{ background: "yellowgreen" }}>
              이미지 들어갈 곳
              <Image src={menuDetail.img_small} rounded />
            </Col>
            <Col md="6" style={{ background: "lightpink" }}>
              파이 차트 들어갈 곳
              <PieSVG data = {menuDetail} width={300} height={300} innerRadius={50} outerRadius={125}></PieSVG>
            </Col>
          </Row>

          <Row>
            <Col
              md="12"
              style={{ background: "lightblue", whiteSpace: "pre-wrap" }}
            >
              {menuDetail.ingredients}
            </Col>
          </Row>

          <Row>
            <Col
              md="12"
              style={{ background: "lemonchiffon", whiteSpace: "pre-wrap" }}
            >
              {menuDetail.recipes.map((recipe: Recipe, i: number) => {
                return (
                  <div key={i}>
                    {recipe.img !== "" && <Image src={recipe.img} />}
                    <p>{recipe.text}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalComponent;
