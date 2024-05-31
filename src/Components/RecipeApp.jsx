import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RecipePage from "./RecipePage";
import FavoritesPage from "./FavoritesPage";
import DarkModeToggle from "./DarkModeToggle";
import Footer from "./Footer";
import { FiStar } from "react-icons/fi";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = useCallback(async (query) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const meals = response.data.meals || [];
      if (meals.length === 0) {
        setError("No recipes found.");
      } else {
        setError("");
      }
      setRecipes(meals);
      localStorage.setItem("recipes", JSON.stringify(meals));
    } catch (error) {
      setError("Network error. Please try again later.");
      console.error("Error fetching recipes:", error);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
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
          darkMode ? "bg-zinc-900 text-white" : "bg-slate-100 text-gray-900"
        }`}
      >
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-transparent hover:bg-gray-300"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <FiStar size={24} color={showFavorites ? "blue" : "gray"} />
        </button>
        {showFavorites ? (
          <FavoritesPage darkMode={darkMode} />
        ) : (
          <>
            <RecipePage
              recipes={recipes}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              darkMode={darkMode}
              error={error}
            />
          </>
        )}
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default React.memo(RecipeApp);
