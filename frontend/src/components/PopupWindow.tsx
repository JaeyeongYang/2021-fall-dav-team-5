import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./SearchHeader.css";

const PopOver = function(menuName: string){ //menuId로 변경해서 사용
  return (
    <Popover id="popover-basic">
    <Popover.Header as="h3">{menuName}</Popover.Header>
    <Popover.Body>
      {menuName}
      (나트륨 함량: ) 
      Pie chart 
      재료: {menuName}을/를 만드는 재료 리스트
      만드는 법: {menuName}을/를 만드는 방법
    </Popover.Body>
  </Popover>
  )
}


export default PopOver;

// const PopupWindow = function (props: any) {
//   return (
//     <>   
//     <OverlayTrigger trigger="hover" placement="top" overlay={PopOver}>
//       <Button variant="success" id="btn">{props.text}</Button>

//     </OverlayTrigger>
//     </>
//   );
// };

// export default PopupWindow;