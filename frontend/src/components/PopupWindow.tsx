import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./SearchHeader.css";
import PieSVG from "./PieSVG";
import { Menu } from "src/store/reducers/data";

const PopOver = function(menu: Menu){ //menuId로 변경해서 사용
  return (
    <Popover id="popover-basic">
    <Popover.Header as="h3">{menu.name}</Popover.Header>
    <Popover.Body>
      {menu.name}<br/>
      <PieSVG data = {menu} width={200} height={200} innerRadius={30} outerRadius={100}></PieSVG><br/>
      (나트륨 함량: {menu.na}) <br/>
      재료: {menu.name}을/를 만드는 재료 리스트<br/>
      만드는 법: {menu.name}을/를 만드는 방법<br/>
    </Popover.Body>
  </Popover>
  )
}


export default PopOver;
// const PopOver = function(menuId: number){ //menuId로 변경해서 사용
//   const dispatch = useAppDispatch();

//   const menu = dispatch(loadMenuDetail(menuId));
//   // const menuDetail = useAppSelector(selectMenuDetail);
//   return (
//     <Popover id="popover-basic">
//     <Popover.Header as="h3">{menu.name}</Popover.Header>
//     <Popover.Body>
//       {menu.name}<br/>
//       <PieSVG data = {menu} width={200} height={200} innerRadius={30} outerRadius={100}></PieSVG><br/>
//       (나트륨 함량: {menu.na}) <br/>
//       재료: {menu.name}을/를 만드는 재료 리스트<br/>
//       만드는 법: {menu.name}을/를 만드는 방법<br/>
//     </Popover.Body>
//   </Popover>
//   )
// }
