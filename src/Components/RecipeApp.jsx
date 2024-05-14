import React, { useState, useEffect } from "react";
import RecipePage from "./RecipePage";
import DarkModeToggle from "./DarkModeToggle";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    const cachedRecipes = localStorage.getItem("recipes");
    if (cachedRecipes) {
      setRecipes(JSON.parse(cachedRecipes));
    } else {
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`API_ENDPOINT?search=${searchQuery}`);
      const data = await response.json();
      setRecipes(data.hits);
      localStorage.setItem("recipes", JSON.stringify(data.hits));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchRecipes();
  };

  // Pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", !darkMode);
  };

  // Apply dark mode based on user preference
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
        />
      </div>
    </div>
  );
};

export default RecipeApp;
