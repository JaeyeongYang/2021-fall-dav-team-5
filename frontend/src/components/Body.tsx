import Search from "./Search";
import Visualization from "./Visualization";
import "./Body.css";
import {  
  Tag,
  BubbleColors
} from "../store/reducers/data";
import ExampleComponent from "./ExampleComponent";

const Body = function ({    
  searchOnKeyPress,
  searchOnChange,
  searchInitLists,
  getAllList,

  getRadioValue,
  setThreeToggleValue,
  deleteIngredientOrMenu,

  bubbleColors,
  bubbleColorValue,
  setBubbleColorValue,

  menuCategory,
  howToCook,
  setMenuCategory,
  setHowToCook
}:{  
  searchOnKeyPress: (e: any) => void,
  searchOnChange: (e: any) => void,
  searchInitLists: () => void,
  getAllList: () => Tag[],

  getRadioValue: () => string,
  setThreeToggleValue: (s: string) => void,
  deleteIngredientOrMenu: (e: any) => void,

  bubbleColors: BubbleColors[],
  bubbleColorValue: string,
  setBubbleColorValue: React.Dispatch<React.SetStateAction<string>>,

  menuCategory: string,
  howToCook: string,
  setMenuCategory: React.Dispatch<React.SetStateAction<string>>,
  setHowToCook: React.Dispatch<React.SetStateAction<string>>
}){
    return (     
        <div className="main">   
        <Search
          searchOnKeyPress={searchOnKeyPress}
          searchOnChange={searchOnChange}         
          searchInitLists={searchInitLists}
          getAllList={getAllList}

          getRadioValue={getRadioValue}
          setThreeToggleValue={setThreeToggleValue}
          deleteIngredientOrMenu={deleteIngredientOrMenu}

          bubbleColors={bubbleColors}
          bubbleColorValue={bubbleColorValue}
          setBubbleColorValue={setBubbleColorValue}

          menuCategory={menuCategory}
          howToCook={howToCook}
          setMenuCategory={setMenuCategory}
          setHowToCook={setHowToCook}
        ></Search>
        
        <ExampleComponent />
        <Visualization></Visualization>
        </div>   
      );

}

export default Body;
