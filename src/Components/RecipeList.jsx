import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, darkMode }) => {
  return (
    <div className="grid gap-4 p-4 w-full">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default RecipeList;
