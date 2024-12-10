"use client";
import React from "react";
import GameSearchBar from "./GameSearchBar";

const SearchBar = () => {
  return (
    <div className="flex justify-center md:mr-auto md:ml-auto">
      <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 mt-4 max-w-[500px] w-full border-[#F6ADDF] border-2">
        <GameSearchBar />
      </div>
    </div>
  );
};

export default SearchBar;