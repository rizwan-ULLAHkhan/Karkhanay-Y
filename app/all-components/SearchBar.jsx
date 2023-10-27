'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; 

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center bg-transparent sm:w-1/2 w-full mx-4 my-2 ">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-2 md:border-transparent rounded-l-lg md:hover:border-Kgreen outline-none text-white pl-2 py-1 transition duration-300 border-Kgreen"
      />
      <button
        onClick={handleSearch}
        className="bg-orange-400 text-white rounded-r-lg px-5 py-1.5 border-Kgreen border-2 md:border-none hover:bg-Kgreen transition duration-300 ml-2"
      >
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
