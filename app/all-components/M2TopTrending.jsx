"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const CombinedFeature = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetching categories from a "backend".
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/getCategories');
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
          setSelectedCategory(data[0]);  // Set the first category by default
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);


  // Pseudo-fetch featured products for a category.
  useEffect(() => {
    let fetchedProducts = [];
    switch (selectedCategory) {
      case "Sports Items":
        fetchedProducts = trending1List;  // You already defined this in your code.
        break;
      case "Medical Supplies":
        fetchedProducts = trending2List;
        break;
      case "Minerals":
        fetchedProducts = trending3List;
        break;
      case "Agricultural":
        fetchedProducts = trending4List;
        break;
      default:
        fetchedProducts = [];
    }
    setFeaturedProducts(fetchedProducts);
  }, [selectedCategory]);

  return (
    <section className="w-full md:px-2.5 lg:px-4 flex-center flex-col mt-8 lg:mt-12">
      <div className="relative flex-row justify-between w-full pb-1">
        <div className="flex px-2.5 md:py-2.5 py-4 text-2xl font-bold leading-[1.15] text-gray-800 sm:text-3xl text-left">
          Top Trending Products in {selectedCategory}
        </div>
      </div>

      <div className="category-bar flex flex-row flex-wrap w-full pb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`p-2 mx-1 mb-2 ${category === selectedCategory
                ? "bg-lime-300 text-white"
                : "bg-lime-100"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-row flex-wrap w-full">
        <div className="flex-col w-full bg-lime-200">
          <div className="flex-col px-1">
            {featuredProducts.map((product) => (
              <Link
                href=""
                onClick={() => { }}
                key={product.id}
                className={`flex w-full h-[108px] border-2 border-gray-300 bg-gray-100 rounded-md hover:bg-lime-100 mb-0.5`}
              >
                <div className="flex flex-col">
                  <div className={`p-0.5 pr-2 flex w-full flex-row`}>
                    <div className="relative flex flex-shrink-0 p-0.5">
                      <Image
                        src={product.imageSrc}
                        alt={product.description}
                        width={80}
                        height={80}
                        className="object-contain rounded-md"
                      />
                    </div>
                    <div className="pl-0.5 flex flex-col justify-between flex-shrink">
                      <span className="bg-yellow-300 text-xs px-2 py-1 rounded">Featured</span>
                      <p className="md:text-sm overflow-ellipsis overflow-hidden wrap line-clamp-3 text-xs md:line-clamp-3">
                        {product.description}
                      </p>
                      <div className="pt-1">
                        <p className="text-xs font-semibold overflow-ellipsis overflow-hidden line-clamp-1">
                          {product.price}
                        </p>
                        <p className="text-xs overflow-ellipsis overflow-hidden line-clamp-1">
                          <span className="font-semibold pr-0.5">MOQ:</span>
                          {product.moq}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-row justify-end bg-lime-300 w-full">
        <button className="hover:bg-lime-200 w-full h-full">
          <h1 className="underline underline-offset-8 justify-end flex px-2.5 md:py-2.5 pb-3 mt-2 text-xl font-bold leading-[1.15] text-black text-right">
            View All Trending Products
          </h1>
        </button>
      </div>
    </section>
  );
};

export default CombinedFeature;

// You'll still need to include the "trending1List", "trending2List", "trending3List", and "trending4List" from your original code.
