import React from "react";
import { FiShare2 } from "react-icons/fi";

const SharingRecipe = ({ recipe }) => {
  // Function to handle sharing
  const handleShare = () => {
    // Construct the text message with recipe details for sharing
    const message = `Check out this recipe: ${recipe.strMeal} - Visit our app page for more details: [https://recipehub-lemon.vercel.app/]`;

    // Construct the link for sharing via WhatsApp
    const whatsappMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

    // Open the share intent in a new window for WhatsApp
    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-full bg-transparent hover:bg-gray-300"
    >
      <FiShare2 size={24} />
    </button>
  );
};

export default SharingRecipe;
