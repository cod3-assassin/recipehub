import React from "react";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const RecipePage = ({
  recipes,
  searchQuery,
  handleSearch,
  currentPage,
  recipesPerPage,
  totalRecipes,
  paginate,
}) => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center relative">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-black">Recipe</span>
        <span className="text-red-400">Hub</span>
      </h1>
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-2xl font-semibold my-6">
        Discover Delicious Recipes
      </h2>
      <RecipeList recipes={recipes} />
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={totalRecipes}
        paginate={paginate}
      />
    </div>
  );
};

export default RecipePage;
