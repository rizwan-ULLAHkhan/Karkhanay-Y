'use client'

import '@/app/styles/productpage.css'
import CustomerReviews from '../CustomerReviews'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/app/redux/features/productpage/productpageSlice'
import { useEffect, useState } from 'react';
import { RootState } from '@/app/redux/store'
import { AppDispatch } from '@/app/redux/store'
import ImageSection from '../ImageSection'


const product = {
    mainImage: "/logo.png", // replace with a valid image path or URL
    name: "Elegant Green Chair",
    price: 129.99,
    description: "An elegant chair made from environmentally-friendly materials. Features a comfortable cushion and a sleek design that fits in any modern home. lets write some other bullshit to see riendly materials. Features a comfortable cushion and a sleek design that fits in",
    thumbnails: [
        "/k1.jpeg", // replace with valid image paths or URLs
        "/k2.jpeg",
        "/k2.jpeg",
    ],
    additionalInfo: "This chair is made using sustainable wood and recyclable materials. It's designed for long-lasting durability and comfort. Perfect for both home and office use.",
    // You can expand with more fields like reviews, specifications, etc. as needed
};




function ProductPage({ params }: { params: { productId: string } }) {
    const [showImageSection, setShowImageSection] = useState(true);

    const productId = params.productId;
    console.log(productId, "checking product id")
    const dispatch: AppDispatch = useDispatch();

    const productData = useSelector((state: RootState) => state.product.product);
    console.log(productData, "checking product data")
    const productStatus = useSelector((state: RootState) => state.product.status);
    const productError = useSelector((state: RootState) => state.product.error);



    useEffect(() => {
        if (productId && (!productData._id || productData._id !== productId)) { // Check if product data is already available
            console.log("dispatch?")
            dispatch(fetchData(productId)); // If not, fetch the data
        }
    }, [productId]);


    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure window object is available
            if (window.innerWidth >= 450) {
                setShowImageSection(true);
            } else {
                setShowImageSection(false);
            }

            // Optional: Add event listener to handle window resize
            const handleResize = () => {
                if (window.innerWidth >= 450) {
                    setShowImageSection(true);
                } else {
                    setShowImageSection(false);
                }
            };

            window.addEventListener('resize', handleResize);

            // Cleanup listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    // ... inside the component render
    if (productStatus === 'loading') {
        return <div>Loading product...</div>;
    }

    if (productStatus === 'error') {
        return <div>Error fetching product: {productError}</div>;
    }
    return (


        <div className="product-page-container ">
            <h1 className="product-title">{productData.name}</h1>
            {/* Product Image Section */}
            <div className='flex xl:gap-8 gap-14 flex-wrap w-full h-full'>
                 <ImageSection productData={productData} />

                <div className=" flex flex-col flex-wrap   gap-2 md:w-1/2">

                    <p className="product-price">${productData.price}</p>
                    <p className="product-description">{productData.description}</p>
                    <button className="add-to-cart-btn w-1/2">Add to Cart</button>
                </div>


            </div>

            <div className=" flex sm:flex-row flex-col gap-10">
                <CustomerReviews />
                <div className='sm:w-1/2 mt-6'>
                    <h2 className='text-lg font-bold'>Additional Information</h2>
                    <p className='mt-6 '>{product.additionalInfo}</p>
                </div>
            </div>
        </div>
    );
}


export default ProductPage;
