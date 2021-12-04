import React from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";
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
import { MenuDetail, Recipe, selectMenuDetail } from "src/store/reducers/data";
import { hideModal, selectDisplayModal } from "src/store/reducers/UI";

const ModalComponent = function () {
  const menuDetail: MenuDetail | null =
    useAppSelector(selectMenuDetail) ?? null;
  const displayModal: boolean = useAppSelector(selectDisplayModal) ?? false;
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(hideModal());

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
            <Col md={{ span: 6, offset: 1 }}>
              <Image src={menuDetail.img_small} rounded fluid/>
            </Col>
            <Col md={{ span: 5, offset: 0 }}>
              <PieSVG data = {menuDetail} width={300} height={300} innerRadius={50} outerRadius={125}></PieSVG>
            </Col>
          </Row>

          <Row >
            <Col
              md="12"
              style={{ background: "#42A5F5", whiteSpace: "pre-wrap",border:'1px solid black' }}
              className="text-center"
            >
              재료
            </Col>
            <Col
              md="12"
              style={{ background: "#90CAF9", whiteSpace: "pre-wrap",border:'1px solid black' }}
            >
              {menuDetail.ingredients}
            </Col>
          </Row>

          <Row>
            <Col
              md="12"
            >
              <p/>
            </Col>
          </Row>
          <Row>
            <Col
              md="12"
              style={{ background: "#9CCC65", whiteSpace: "pre-wrap" ,border:'1px solid black' }}
              className="text-center"
            >
            만드는 법
            </Col>
            {menuDetail.recipes.map((recipe: Recipe, i: number) => {
              return (
                <div key={i}>
                  <Row>
                    <Col
                      md="9"
                      style={{ background: "#C5E1A5", whiteSpace: "pre-wrap",border:'1px solid black'  }}
                    >
                    {recipe.text.replace(/\n/g, "")}
                    </Col>
                    <Col
                      md="3"
                      style={{ background: "#C5E1A5", whiteSpace: "pre-wrap" ,border:'1px solid black' }}
                    >
                    {recipe.img !== "" && <Image src={recipe.img}  fluid/>}
                    </Col>
                  </Row>
                </div>
              );
            })}


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
