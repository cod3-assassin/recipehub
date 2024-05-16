import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden text-gray-800 w-full">
      <img
        className="w-full h-64 object-cover object-center"
        src={recipe.strMealThumb} // Use strMealThumb for the image source
        alt={recipe.strMeal} // Use strMeal for the alt text
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{recipe.strMeal}</h2>{" "}
        {/* Use strMeal for the recipe label */}
        <ul className="mb-4">
          {/* Map over the ingredient and measure properties */}
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = recipe[`strIngredient${index + 1}`];
            const measure = recipe[`strMeasure${index + 1}`];
            if (ingredient && ingredient.trim() !== "") {
              return (
                <li key={index} className="mb-2">
                  <span className="font-semibold text-gray-900">{measure}</span>{" "}
                  <span className="text-gray-800">{ingredient}</span>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <p className="mb-4 text-gray-800">{recipe.strInstructions}</p>{" "}
        {/* Use strInstructions for the recipe instructions */}
        <a
          className="text-blue-500 hover:text-blue-700 block"
          href={recipe.strYoutube}
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
