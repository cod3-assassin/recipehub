import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className="p-2 rounded-full hover:bg-gray-400 hover:text-gray-900 transition-all duration-300 fixed bottom-8 right-8 z-10"
      onClick={toggleDarkMode}
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
