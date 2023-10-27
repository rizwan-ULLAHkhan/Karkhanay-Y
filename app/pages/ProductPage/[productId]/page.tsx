'use client'
import Image from 'next/image';
import '@/app/styles/productpage.css'
import CustomerReviews from '../CustomerReviews'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/app/redux/features/productpage/productpageSlice'
import { useEffect } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import { RootState } from '@/app/redux/store'
import { AppDispatch  } from '@/app/redux/store'


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




function ProductPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
const productId = searchParams.get('productId');
    console.log(productId,"checking product id")
    const dispatch: AppDispatch = useDispatch();

    const productData = useSelector((state: RootState) => state.product.product);
    const productStatus = useSelector((state: RootState)=> state.product.status);

    useEffect(() => {
        if (!productData._id || productData._id !== productId) { // Check if product data is already available
            dispatch(fetchData()); // If not, fetch the data
        }
    }, [productId]);
    return (


        <div className="product-page-container">
            <h1 className="product-title ">{productData.name}</h1>
            {/* Product Image Section */}
            <div className='flex gap-4'>

                <div className="product-image-section">

                    {/* Main Image */}
                    <div className=' flex h-80 w-80'>
                        <Image
                            src={product.mainImage}
                            alt={productData.name}
                            layout="responsive"
                            width={700} // Adjust width as needed
                            height={700} // Adjust height as needed
                            className="main-product-image"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-6 ml-2">
                        {product.thumbnails.map((thumb, index) => (
                            <Image
                                key={index}
                                src={thumb}
                                alt={`Thumbnail ${index}`}
                                width={70}
                                height={80}
                                className="thumbnail"
                            />
                        ))}
                    </div>
                </div>

                <div className=" flex flex-col flex-wrap gap-2 w-1/2">

                    <p className="product-price">${productData.price}</p>
                    <p className="product-description">{productData.description}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>

                <CustomerReviews />
            </div>

            <div className="additional-info-section">
                <h2>Additional Information</h2>
                <p>{product.additionalInfo}</p>
            </div>
        </div>
    );
}


export default ProductPage;
