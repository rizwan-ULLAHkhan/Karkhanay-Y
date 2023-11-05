"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/features/productpage/productpageSlice';


const CombinedFeature = () => {
  const [categoriesWithTrending, setCategoriesWithTrending] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
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
    <section className="w-full md:px-4 lg:px-6 pt-8 lg:pt-12 bg-gray-50 p-4">
      <div className="flex justify-center items-center pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-Kgray">
          {loading ? 'Loading...' : `Top Trending Products in ${selectedCategory}`}
        </h1>
      </div>

      {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mx-20 ">
          {featuredProducts.map((product) => (
            
            <Link href={`/pages/ProductPage/${product._id}`} key={product._id} className=" p-8 border-2 border-Kgreen rounded-2xl shadow-md hover:bg-lime-50 transition bg-white mt-3" onClick={() => dispatch(setSelectedProduct(product))}>
               
                <div className="flex items-center gap-4 mb-2 flex-col ">
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
                    <h2 className="text-2xl font-semibold group-hover:text-lime-500">{product.name}</h2>
                    {/* <p className="text-sm text-gray-600 mt-1">In this version, I've wrapped the grid of product cards inside a parent div with a white background and a border to make it feel like a single cohesive card. This adds a layer of hierarchy to the design, which can make the content feel more organized and contained.</p> */}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center mt-4">
                  <span className="text-md font-bold">Starting from {product.price} Rs</span>
                  <span className="text-xs mt-4 bg-Kgreen px-2 py-1 rounded-full">Featured</span>
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
