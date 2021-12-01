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
    dispatch(clearMenuDetail());
    setShow(false)
  };
  const handleShow = () => {
    dispatch(loadMenuDetail(2));
    setShow(true)
  };
  const visualizePie  = (menuDetail:MenuDetail|undefined) =>{
    
    if (typeof menuDetail !==undefined){
      return <PieSVG data = {menuDetail!} width={300} height={300} innerRadius={50} outerRadius={125}></PieSVG>
    }
    else{
      return "Undefined menuDetail"
    }
  }
  
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
                            <Image src={menuDetail?.img_small} rounded />
                        </Col>
                        <Col md="6" style={{background: 'lightpink'}}>
                          {
                            // visualizePie(menuDetail)
                          }
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12" style={{background: 'lightblue', whiteSpace: 'pre-wrap'}}>
                            {menuDetail?.ingredients}
                        </Col>  
                    </Row>

                    <Row>
                      <Col md="12" style={{background: 'lemonchiffon', whiteSpace: 'pre-wrap'}}>
                        {menuDetail?.recipes[0].text}
                        <Image src={menuDetail?.recipes[0].img} rounded />
                        {
                          
                          menuDetail?.recipes.map((recipe: Recipe) => {
                              {JSON.stringify(recipe.text)}
                          })
                        }
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
      </div>
    </div>    
  );
};

export default ModalComponent;
