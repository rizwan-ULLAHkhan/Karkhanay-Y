'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation'
import "@/app/styles/searchbar.css"

const SearchBar = ({ onSearch, location }) => {
  console.log(location, "bhai check this location")
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchBarClass = location === 'hero'
    ? "search-input-hero"
    : "flex-1 bg-white border-2 md:border-transparent rounded-l-lg md:hover:border-Kgreen outline-none text-black pl-2 py-1 transition duration-300 border-Kgreen";

  const buttonClass = location === 'hero'
    ?"search-button-hero"
    : "bg-orange-400 text-white rounded-r-lg px-5 py-1.5 border-Kgreen border-2 md:border-none hover:bg-Kgreen transition duration-300 ml-2";

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    // Avoiding empty queries
    if (!trimmedSearchTerm) {
      alert("Please enter a valid search term!");
      return;
    }

    // Setting minimum length
    if (trimmedSearchTerm.length < 3) {
      alert("Please enter at least 3 characters!");
      return;
    }

    // Filtering special characters
    if (!/^[a-z0-9 ]+$/i.test(trimmedSearchTerm)) {
      alert("Only alphanumeric characters and spaces are allowed!");
      return;
    }

    onSearch(searchTerm, setIsLoading); // Pass setIsLoading to the parent to change its state
    router.push('/pages/ProductSearchPage')
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex items-center sm:w-1/2 w-full mx-4 my-2 ${location === 'hero' ? 'hero-specific-styles' : 'navbar-specific-styles'}`}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className={searchBarClass}
      />
      <button
        onClick={handleSearch}
        className={buttonClass}
      >
        {isLoading ? 'Searching...' : <FiSearch />}
      </button>
    </div>
  );
};
export default SearchBar;
