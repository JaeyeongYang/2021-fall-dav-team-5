import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./SearchHeader.css";

const PopOver = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">단호박 샐러드</Popover.Header>
    <Popover.Body>
      단호박 샐러드 
      (나트륨 함량: ) 
      Pie chart 
      재료: ~~~
      만드는 법: ~~~
    </Popover.Body>
  </Popover>
);


const PopupWindow = function (props: any) {
  return (
    <>   
    <OverlayTrigger trigger="hover" placement="top" overlay={PopOver}>
      <Button variant="success" id="btn">{props.text}</Button>

    </OverlayTrigger>
    </>
  );
};

export default PopupWindow;