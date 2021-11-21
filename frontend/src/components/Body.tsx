import Search from "./Search";
import Visualization from "./Visualization";
import "./Body.css";
import { Tag } from "../interfaces";

const Body = function ({  
  menus,
  menu,
  
  searchOnKeyPress,
  searchOnChange,
  searchInitLists,
  getAllList,

  getRadioValue,
  setThreeToggleValue
}:{
  menus: Promise<any>,
  menu: Promise<any>,

  searchOnKeyPress: (e: any) => void,
  searchOnChange: (e: any) => void,
  searchInitLists: () => void,
  getAllList: () => Tag[],

  getRadioValue: () => string,
  setThreeToggleValue: (s: string) => void
}) {
    
    return (     
        <div className="main">   
        <Search
          searchOnKeyPress={searchOnKeyPress}
          searchOnChange={searchOnChange}         
          searchInitLists={searchInitLists}
          getAllList={getAllList}

          getRadioValue={getRadioValue}
          setThreeToggleValue={setThreeToggleValue}
        ></Search>


        <Visualization
          menus={menus}
          menu={menu}  
        ></Visualization>
        </div>   
      );

}

export default Body;

