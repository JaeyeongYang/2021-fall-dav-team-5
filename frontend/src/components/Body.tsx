import Search from "./Search";
import Visualization from "./Visualization";
import "./Body.css";
import {  
  Tag
} from "../store/reducers/data";
import ExampleComponent from "./ExampleComponent";

const Body = function ({    
  searchOnKeyPress,
  searchOnChange,
  searchInitLists,
  getAllList,

  getRadioValue,
  setThreeToggleValue
}:{  
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
        
        <ExampleComponent />
        <Visualization></Visualization>
        </div>   
      );

}

export default Body;
