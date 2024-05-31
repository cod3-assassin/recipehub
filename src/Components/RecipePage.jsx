import React, { useState } from "react";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";

const RecipePage = ({ recipes, handleSearch, darkMode, error }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">
        <span className="text-white bg-black rounded-md">Recipe</span>
        <span className="text-black bg-orange-500 rounded-md">Hub</span>
      </h1>
      <SearchBar handleSearch={handleSearchQuery} />
      {error && (
        <div className="p-4 mt-4 mb-6 text-center bg-yellow-200 text-yellow-800 rounded-lg w-full max-w-md">
          {error}
        </div>
      )}
      <h2 className="text-xl sm:text-2xl font-semibold my-6 text-center">
        {searchQuery
          ? `Search result for "${searchQuery}"`
          : "Discover Delicious Recipes"}
      </h2>
      <RecipeList recipes={recipes} darkMode={darkMode} />
    </div>
  );
};

export default RecipePage;
