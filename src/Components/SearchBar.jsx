import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ handleSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || "");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query.trim());
  };

  // Effect to update query when initialQuery prop changes
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="flex items-center justify-center py-4 px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full max-w-lg"
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={handleChange}
          className="border border-gray-300 rounded-l-lg py-2 px-4 w-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
          style={{ paddingRight: "3rem" }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-lg py-2 px-4 ml-1 sm:ml-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          style={{ height: "2.5rem" }}
        >
          <FaSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
