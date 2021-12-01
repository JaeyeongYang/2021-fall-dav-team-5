import React from "react";
import SearchInput from "./SearchInput";
import "./SearchBar.css";

const SearchBar = function (props: any) {
  return (
    <section className="search-section">
      <SearchInput />
    </section>
  );
};

export default SearchBar;
