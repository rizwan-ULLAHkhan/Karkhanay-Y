"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/features/productpage/productpageSlice';
import '@/app/styles/toptrending.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Mousewheel } from 'swiper';


const TopTrending = () => {
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
    <section className="featuredSection">
      <div className="titleContainer">
        <h1 className="title">
          {loading ? 'Loading...' : `Top Trending Products in ${selectedCategory}`}
        </h1>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="categoryContainer">
        {categoriesWithTrending.map((category) => (
          <button
            key={category.categoryName}
            className={`categoryButton ${category.categoryName === selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.categoryName)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enable navigation
        mousewheel={true} // Enable mousewheel control
        modules={[Pagination, Navigation, Mousewheel]} // Include Mousewheel in modules
        className="mySwiper"
        breakpoints={{
          // when window width is >= 1080px
          1080: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // when window width is >= 850px
          650: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          160: {
            slidesPerView: 1,
            spaceBetween: 10,
          }
        }}
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="productCard">
              <Link href={`/pages/ProductPage/${product._id}`}
                onClick={() => dispatch(setSelectedProduct(product))}>
                <div className="productImageContainer">
                  <Image
                    src={product.urls[0]}
                    alt={product.description}
                    layout="fill"
                    objectFit="cover"
                    className="productImage"
                  />
                </div>
                <div className="productInfo">
                  <h2 className="productName">{product.name}</h2>
                  <p className="productPrice">Starting from {product.price} Rs</p>
                </div>

              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="viewAllContainer">
        <button className="viewAllButton">View All Trending Products</button>
      </div>
    </section>
  );

}
export default TopTrending;
