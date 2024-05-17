import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RecipePage from "./RecipePage";
import FavoritesPage from "./FavoritesPage";
import DarkModeToggle from "./DarkModeToggle";
import { FiBook } from "react-icons/fi";
import Footer from "./Footer";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const [darkMode, setDarkMode] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchRecipes = useCallback(async (query) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const meals = response.data.meals || [];
      setRecipes(meals);
      localStorage.setItem("recipes", JSON.stringify(meals));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchRecipes(query);
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("recipes");
    if (searchQuery && cachedData) {
      setRecipes(JSON.parse(cachedData));
    } else {
      setRecipes([]);
    }
  }, [searchQuery]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-transparent hover:bg-gray-300"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <FiBook size={24} color={showFavorites ? "blue" : "gray"} />
        </button>
        {showFavorites ? (
          <FavoritesPage darkMode={darkMode} />
        ) : (
          <RecipePage
            recipes={currentRecipes}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            currentPage={currentPage}
            recipesPerPage={recipesPerPage}
            totalRecipes={recipes.length}
            paginate={paginate}
            darkMode={darkMode}
          />
        )}
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default React.memo(RecipeApp);
