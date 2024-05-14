// RecipeList.jsx

import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-red-500">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.recipe.label} recipe={recipe.recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
