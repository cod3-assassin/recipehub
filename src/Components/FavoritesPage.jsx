import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";

const FavoritesPage = ({ darkMode }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.idMeal !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-6xl font-bold mb-8 text-center">My Favorites</h1>
      {favorites.length > 0 ? (
        <>
          <button
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={removeAllFavorites}
          >
            Remove All Favorites
          </button>
          <RecipeList
            recipes={favorites}
            darkMode={darkMode}
            removeFromFavorites={removeFromFavorites}
          />
        </>
      ) : (
        <p className="text-center text-xl">You don't have any favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
