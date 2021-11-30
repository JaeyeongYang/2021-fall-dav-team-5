import React, {useState} from "react";
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

const ModalComponent = function () {

  /////// modal 
  const [show, setShow] = useState(false);
  const handleClose = () =>{
    setShow(false)
    dispatch(clearMenuDetail());
  };
  const handleShow = () => {
    setShow(true)
    dispatch(loadMenuDetail(2));
  };

  const menuDetail = useAppSelector(selectMenuDetail);
  const dispatch = useAppDispatch();


  return (
    <div>      
      <span>Modal Layout</span>
      <div>
        <Button onClick={handleShow}>Open Modal</Button>

        <Modal show={show} onHide={handleClose} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="modal-component-row">
                        <Col md="6" style={{background: 'yellowgreen'}}>
                            이미지 들어갈 곳
                            <Image src={menuDetail?.img_small} rounded />
                        </Col>
                        <Col md="6" style={{background: 'lightpink'}}>
                          {/* <PieSVG data = {menuDetail===undefined?menuDetail:""} width={300} height={300} innerRadius={50} outerRadius={125}></PieSVG> */}
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12" style={{background: 'lightblue', whiteSpace: 'pre-wrap'}}>
                            {menuDetail?.ingredients}
                        </Col>  
                    </Row>

                    <Row>
                      {
                        menuDetail?.recipes.map((recipe: Recipe) => {
                          <Col md="12" style={{background: 'lemonchiffon', whiteSpace: 'pre-wrap'}}>
                            {JSON.stringify(recipe.text)}
                            {JSON.stringify(menuDetail?.recipes[0])}
                          </Col>
                        })
                      }
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
      </div>
    </div>    
  );
};

export default ModalComponent;
