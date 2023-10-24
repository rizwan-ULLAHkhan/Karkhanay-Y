"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CombinedFeature = () => {
  const [categoriesWithTrending, setCategoriesWithTrending] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoriesWithTrending() {
      setLoading(true);
      try {
        const response = await fetch('/api/getCategories');
        const data = await response.json();
        if (response.ok) {
          setCategoriesWithTrending(data);
          setSelectedCategory(data[0]?.categoryName);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoriesWithTrending();
  }, []);

  const featuredProducts = selectedCategory 
    ? categoriesWithTrending.find(cat => cat.categoryName === selectedCategory)?.trendingProducts 
    : [];

  return (
    <section className="w-full md:px-4 lg:px-6 mt-8 lg:mt-12 bg-gray-50 p-4">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {loading ? 'Loading...' : `Top Trending Products in ${selectedCategory}`}
        </h1>
      </div>

      {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesWithTrending.map((category) => (
          <button
            key={category.categoryName}
            className={`p-2 rounded shadow ${category.categoryName === selectedCategory
                ? "bg-lime-500 text-white"
                : "bg-lime-200 text-gray-800"
              }`}
            onClick={() => setSelectedCategory(category.categoryName)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      <div className="p-4 bg-Kgray border rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 lg:mx-20 ">
          {featuredProducts.map((product) => (
            <Link href="#" key={product._id} className=" p-8 border rounded shadow-md hover:bg-lime-50 transition bg-white mt-3">
               
                <div className="flex items-center gap-4 mb-2 flex-col">
                  <div className="w-36 h-56 relative min-w-full">
                    <Image
                      src={product.urls[0]}
                      alt={product.description}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold group-hover:text-lime-500">{product.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">In this version, I've wrapped the grid of product cards inside a parent div with a white background and a border to make it feel like a single cohesive card. This adds a layer of hierarchy to the design, which can make the content feel more organized and contained.</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">{product.price}</span>
                  <span className="text-sm bg-yellow-300 px-2 py-1 rounded-full">Featured</span>
                </div>
              
            </Link>
          ))}
        </div>
        <div className="text-right mt-4">
          <button className="text-Kgreen border p-2 font-semibold hover:underline">View All Trending Products</button>
        </div>
      </div>
    </section>
  );
};

export default CombinedFeature;
