import React from "react";

const RecipeCard = ({ recipe, darkMode }) => {
  // Split the instructions into steps based on newlines or periods
  const steps = recipe.strInstructions
    .split(".")
    .filter((step) => step.trim() !== "");

  // Determine text color based on the app mode
  const textColor = darkMode ? "text-white" : "text-gray-800";

  return (
    <div
      className={`w-full ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } ${textColor}`}
    >
      <div className="p-6 border rounded-xl shadow-lg">
        <h2 className={`text-4xl font-semibold mt-4 text-center`}>
          {recipe.strMeal}
        </h2>
        <div className="md:flex md:space-x-4 mt-4">
          <div className="md:w-1/2">
            <img
              className="h-100 w-full object-cover object-center rounded-xl shadow-lg"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-start">
            <h3 className="text-2xl font-semibold mb-4">Ingredients</h3>
            <ul className="list-disc list-inside">
              {Array.from({ length: 20 }).map((_, index) => {
                const ingredient = recipe[`strIngredient${index + 1}`];
                const measure = recipe[`strMeasure${index + 1}`];
                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <li key={index} className="mb-2">
                      <span className="font-semibold">{measure}</span>{" "}
                      <span>{ingredient}</span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
        <div className="p-6 mt-6 border-2 rounded-xl shadow-lg space-x-4">
          <h3 className="text-xl font-semibold mb-4">How to Make</h3>
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step.trim()}
              </li>
            ))}
          </ol>
          <a
            className="text-blue-500 hover:text-blue-700 block mt-4"
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
