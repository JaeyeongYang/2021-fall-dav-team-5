import "./Body.css";

import SearchBar from "src/components/searchbar/SearchBar";
import Visualization from "./Visualization";
import ModalComponent from "./ModalComponent";

// const Body = function ({
//   searchOnKeyPress,
//   searchOnChange,
//   searchInitLists,
//   getAllList,

//   getRadioValue,
//   setThreeToggleValue,
//   deleteIngredientOrMenu,

//   bubbleColors,
//   bubbleColorValue,
//   setBubbleColorValue,

//   menuCategory,
//   howToCook,
//   setMenuCategory,
//   setHowToCook,

//   xAxis,
//   yAxis,
//   setXAxis,
//   setYAxis,
//   onAlignButtonClick,
//   onResetButtonClick
// }:{
//   searchOnKeyPress: (e: any) => void,
//   searchOnChange: (e: any) => void,
//   searchInitLists: () => void,
//   getAllList: () => Tag[],

//   getRadioValue: () => string,
//   setThreeToggleValue: (s: string) => void,
//   deleteIngredientOrMenu: (e: any) => void,

//   bubbleColors: BubbleColors[],
//   bubbleColorValue: string,
//   setBubbleColorValue: React.Dispatch<React.SetStateAction<string>>,

//   menuCategory: string,
//   howToCook: string,
//   setMenuCategory: React.Dispatch<React.SetStateAction<string>>,
//   setHowToCook: React.Dispatch<React.SetStateAction<string>>,

//   xAxis: string,
//   yAxis: string,
//   setXAxis: React.Dispatch<React.SetStateAction<string>>,
//   setYAxis: React.Dispatch<React.SetStateAction<string>>,
//   onAlignButtonClick: (e: any) => void,
//   onResetButtonClick: (e: any) => void
// }){
//     return (
//         <div className="main">
//           <Search
//             searchOnKeyPress={searchOnKeyPress}
//             searchOnChange={searchOnChange}
//             searchInitLists={searchInitLists}
//             getAllList={getAllList}

//             getRadioValue={getRadioValue}
//             setThreeToggleValue={setThreeToggleValue}

//             deleteIngredientOrMenu={deleteIngredientOrMenu}

//             bubbleColors={bubbleColors}
//             bubbleColorValue={bubbleColorValue}
//             setBubbleColorValue={setBubbleColorValue}

//             menuCategory={menuCategory}
//             howToCook={howToCook}
//             setMenuCategory={setMenuCategory}
//             setHowToCook={setHowToCook}
//           ></Search>

//           <Visualization
//             xAxis={xAxis}
//             yAxis={yAxis}
//             setXAxis={setXAxis}
//             setYAxis={setYAxis}
//             onAlignButtonClick={onAlignButtonClick}
//             onResetButtonClick={onResetButtonClick}
//           >
//           </Visualization>
//         </div>
//       );

const Body = function () {
  return (
    <div className="main">
      <SearchBar />
      <Visualization></Visualization>
      <ModalComponent></ModalComponent>
    </div>
  );
};

export default Body;
