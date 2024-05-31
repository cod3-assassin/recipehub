import React, { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharingRecipe from "./SharingRecipe";

const RecipeCard = ({ recipe, darkMode, onSelect, onClose, expanded }) => {
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

  const steps = recipe.strInstructions
    .split(".")
    .filter((step) => step.trim() !== "");

  const textColor = darkMode ? "text-white" : "text-gray-800";

  if (expanded) {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full z-50 p-4 overflow-auto ${
          darkMode ? "bg-zinc-900 text-white" : "bg-slate-100 text-gray-800"
        }`}
      >
        <FaBackspace
          className="absolute top-4 right-4 text-2xl font-bold bg-transparent p-2 rounded-full size-12"
          onClick={onClose}
        />

        <div className="p-6 border rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold mt-4 text-center">
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
  }

  return (
    <div
      className={`w-full cursor-pointer p-6 border rounded-xl shadow-lg ${
        darkMode ? "bg-stone-900 text-white" : "bg-blue-100 text-gray-800"
      }`}
      onClick={() => onSelect(recipe)}
    >
      <img
        className="h-48 w-full object-cover object-center rounded-xl shadow-lg"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <h2 className="text-2xl font-semibold mt-4 text-center">
        {recipe.strMeal}
      </h2>
    </div>
  );
};

export default RecipeCard;
