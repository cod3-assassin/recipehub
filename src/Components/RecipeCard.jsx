// RecipeCard.jsx

import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-32 object-cover object-center"
        src={recipe.image}
        alt={recipe.label}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.label}</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredientLines.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p className="text-gray-600">{recipe.source}</p>
        <a
          className="text-blue-500 hover:text-blue-700"
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
