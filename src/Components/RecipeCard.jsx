import React, { useState, useEffect } from "react";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharingRecipe from "./SharingRecipe";

const RecipeCard = ({ recipe, darkMode }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setIsFavorited(storedFavorites.some((fav) => fav.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipe.idMeal
      );
      toast.info("Removed from favorites!", {
        className: "bg-red-500 text-white",
        progressClassName: "bg-red-700",
      });
    } else {
      updatedFavorites = [...favorites, recipe];
      toast.success("Added to favorites!", {
        className: "bg-green-500 text-white",
        progressClassName: "bg-green-700",
      });
    }
    setFavorites(updatedFavorites);
    setIsFavorited(!isFavorited);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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
      <div className="p-6 border rounded-xl shadow-lg relative">
        <h2 className={`text-4xl font-semibold mt-4 text-center`}>
          {recipe.strMeal}
        </h2>
        <div className="md:flex md:space-x-4 mt-4">
          <div className="md:w-1/2 relative">
            <img
              className="h-100 w-full object-cover object-center rounded-xl shadow-lg"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-transparent hover:bg-gray-300"
              onClick={toggleFavorite}
            >
              <FiHeart size={24} color={isFavorited ? "red" : "gray"} />
            </button>
            <div className="flex justify-center mt-2">
              <SharingRecipe recipe={recipe} />
            </div>
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
