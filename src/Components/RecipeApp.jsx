import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import RecipePage from "./RecipePage";
import DarkModeToggle from "./DarkModeToggle";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery with an empty string
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const [darkMode, setDarkMode] = useState(false);

  const fetchRecipes = useCallback(async (query) => {
    // Pass query as a parameter
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const meals = response.data.meals || [];
      setRecipes(meals);
      localStorage.setItem("recipes", JSON.stringify(meals));
      console.log(
        "Response from server:",
        JSON.stringify(response.data, null, 2)
      );
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const cachedRecipes = useMemo(() => {
    try {
      const cachedData = localStorage.getItem("recipes");
      return cachedData ? JSON.parse(cachedData) : [];
    } catch (error) {
      console.error("Error parsing cached recipes:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    if (cachedRecipes.length === 0) {
      fetchRecipes(searchQuery);
    } else {
      setRecipes(cachedRecipes);
    }
  }, [fetchRecipes, cachedRecipes]); // Remove searchQuery from dependencies

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
    setCurrentPage(1);
    fetchRecipes(query); // Call fetchRecipes when the user performs a search
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  console.log("Current pased data :", JSON.stringify(currentRecipes));

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
      </div>
    </div>
  );
};

export default React.memo(RecipeApp);
