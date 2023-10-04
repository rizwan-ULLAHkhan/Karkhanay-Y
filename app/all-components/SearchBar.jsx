'use client'
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // You might need to install this package

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="hidden sm:flex  border-2 hover:border-Kgreen rounded-lg shadow-lg  ">
      <input
        type="text"
        placeholder=" Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent border-none outline-none w-full text-white mr-1"
      />
      <button
        onClick={handleSearch}
        className="bg-Kgray text-white rounded-md px-4 py-1.5 ml-2"
      >
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
