import React from "react";
import RecipeApp from "./Components/RecipeApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <RecipeApp />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default App;
