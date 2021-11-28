import "./Body.css";
import { Tag, BubbleColors } from "src/store/reducers/data";

import SearchBar from "src/components/searchbar/SearchBar";
import ExampleComponent from "./ExampleComponent";
import Visualization from "./Visualization";

const Body = function () {
  return (
    <div className="main">
      <SearchBar />
      <ExampleComponent />
      <Visualization></Visualization>
    </div>
  );
};

export default Body;
