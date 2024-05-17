import React from "react";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";

const RecipePage = ({ recipes, handleSearch, darkMode }) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8">
        <span className="text-black">Recipe</span>
        <span className="text-red-400">Hub</span>
      </h1>
      <SearchBar handleSearch={handleSearch} />
      <h2 className="text-2xl font-semibold my-6">
        Discover Delicious Recipes
      </h2>
      <RecipeList recipes={recipes} darkMode={darkMode} />
    </div>
  );
};

export default RecipePage;
