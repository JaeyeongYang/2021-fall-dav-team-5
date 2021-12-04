import React from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Image,
  Table,
  Button,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  clearMenuDetail,
  loadMenuDetail,
  selectMenuDetail,
  MenuDetail,
  Recipe,
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
            <Col md="3">
              <Image src={menuDetail.img_small} style={{ width: "100%" }} />
            </Col>
            <Col md="6">
              <Table>
                <thead>
                  <tr>
                    <th>재료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{menuDetail.ingredients}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <PieSVG data={menuDetail}></PieSVG>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Table striped>
                <thead>
                  <tr>
                    <th>만드는 법</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {menuDetail.recipes.map((recipe: Recipe, i: number) => {
                    return (
                      <tr key={i}>
                        <td>{recipe.text.replace(/\n/g, "")}</td>
                        <td>
                          {recipe.img !== "" && (
                            <Image
                              src={recipe.img}
                              fluid
                              thumbnail
                              style={{ maxWidth: "200px" }}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
