import "./Body.css";

import SearchBar from "src/components/searchbar/SearchBar";
import Visualization from "./Visualization";

const Body = function () {
  return (
    <div className="main">
      <SearchBar />
      <Visualization></Visualization>
    </div>
  );
};

export default Body;
