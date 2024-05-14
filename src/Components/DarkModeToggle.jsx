import React from "react";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className={`p-2 rounded-full ${
        darkMode ? "bg-gray-300 text-gray-800" : "bg-gray-800 text-gray-300"
      } hover:bg-gray-400 hover:text-gray-900 transition duration-300 absolute top-4 right-4`}
      onClick={toggleDarkMode}
    >
      {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default DarkModeToggle;
