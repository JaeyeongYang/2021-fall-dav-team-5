import "./Body.css";
import { Tag, BubbleColors } from "src/store/reducers/data";

import Search from "src/components/searchbar/Search";
import ExampleComponent from "./ExampleComponent";
import Visualization from "./Visualization";

const Body = function () {
  return (
    <div className="main">
      <Search />
      <ExampleComponent />
      <Visualization></Visualization>
    </div>
  );
};

export default Body;
