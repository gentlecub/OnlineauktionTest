import React from "react";
import { useEffect, useState, useContext } from "react";

function SearchItem({ search, setSearch }) {
  function handleCar(e) {
    setSearch(e.target.value);
    console.log("Dime que hay", search);
  }
  return (
    <>
      <input
        id="search"
        type="text"
        role="searchBox"
        className="form-control"
        placeholder="Search..."
        value={search}
        onChange={handleCar}
      />
    </>
  );
}

export default SearchItem;
