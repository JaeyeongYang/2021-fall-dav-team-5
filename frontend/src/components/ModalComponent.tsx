import React, {useState} from "react";
import { Button, Modal, Container, Row, Col, Image } from "react-bootstrap";

const ModalComponent = function () {
  
  const example_ingredients:string = "<재료 들어갈 곳> \r\n" + 
    "ex) \n" +
    "밥:밥 210g(1공기) \n" + 
    "다시마육수:무 30g(3×3×2cm), 다시마 5g(3×2cm), 가쓰오부시 약간, 물 500ml(2½컵) \n" +
    "숙주 품은 치킨: 닭가슴살 80g(1/2개), 숙주 80g(1/5봉지), 표고버섯 10g(1장),팽이버섯 10g(1/6봉지), 양파 20g(1/6개), 달걀 25g(1/2개), 저염간장 5g(1작은술), 맛술 5g(1작은술), 쪽파 약간, 참깨 약간 \n"
  
  const example_recipe: string = "<레서피 들어갈 곳> \n"  + 
    "ex) \n" +
    "1. 다시마를 물에 30분 정도 담가 우린 물에 무를 함께 넣고 끓여준다. 물이 끓기 시작하면 가쓰오부시를 넣어 3분 정도 우려낸 후 체에 거른다. \n" +   
    "2. 닭고기는 한입 크기로 썰어 달군 프라이팬에 넣고 닭고기가 하얗게 변하면 2~3분 더 노릇하게 굽는다. \n" +
    "3. 양파와 표고버섯은 채 썬다. 마른 표고버섯일 경우에는 미지근한 물에 5~10분 정도 불려 사용한다. \n" +
    "4. 구운 닭고기(2)에 끓인 육수(1), 채썬 양파와 표고버섯(3) 팽이버섯, 저염간장, 맛술을 넣고 끓여준다. \n" +
    "5. 닭고기가 익으면 숙주를 넣어 끓이고 마지막에 달걀을 풀어 넣어 익힌다. \n" +
    "6. 그릇에 밥을 담고 준비된 재료를 담은 후 쪽파를 송송 썰어 올리고 참깨를 뿌린다. \n"
  

  /////// modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [menuName, setMenuName] = useState('숙주 품은 치킨'); // 메뉴 이름
  const [menuImage, setMenuImage] = useState('http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00001_2.png') // 이미지
  const [menuPieChart, setMenuPieChart] = useState('') // 파이 차트. 어떻게 구현될지 몰라서 예시 코드를 안 만들었어요.
  const [ingredients, setIngredients] = useState(example_ingredients); // 재료
  const [recipe, setRecipe] = useState(example_recipe); // 레서피


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
                {menuName}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="modal-component-row">
                        <Col md="6" style={{background: 'yellowgreen'}}>
                            이미지 들어갈 곳
                            <Image src={menuImage} rounded />
                        </Col>
                        <Col md="6" style={{background: 'lightpink'}}>
                            파이 차트 들어갈 곳

                        </Col>
                    </Row>

                    <Row>
                        <Col md="12" style={{background: 'lightblue', whiteSpace: 'pre-wrap'}}>
                            {ingredients}
                        </Col>                    
                    </Row>

                    <Row>
                        <Col md="12" style={{background: 'lemonchiffon', whiteSpace: 'pre-wrap'}}>
                            {recipe}
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
