import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, darkMode }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div
      className={`p-4 w-full ${
        darkMode ? "bg-zinc-900 text-white" : "bg-slate-100 text-gray-800"
      }`}
    >
      {selectedRecipe ? (
        <RecipeCard
          recipe={selectedRecipe}
          darkMode={darkMode}
          onClose={handleCloseRecipe}
          expanded
        />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              darkMode={darkMode}
              onSelect={handleSelectRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
