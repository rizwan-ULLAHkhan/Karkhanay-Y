'use client'

import '@/app/styles/productpage.css'
import CustomerReviews from '../CustomerReviews'
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/app/redux/features/productpage/productpageSlice'
import { useEffect, useState } from 'react';
import { RootState } from '@/app/redux/store'
import { AppDispatch } from '@/app/redux/store'
import ImageSection from '../ImageSection'
import ChatInterface from '../ChatInterface'; // Import your chat interface component
import { useSession } from 'next-auth/react';



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
    const [conversationId, setConversationId] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [senderId, setSenderId] = useState("")
    const [receiverName, setReceiverName] = useState("")
    const [receiverImage, setReceiverImage] = useState("")


    const { data: session } = useSession();

    useEffect(() => {
        if (session) { // Check if session exists
            setSenderId(session?.user.id)
        }
    }, []);


    const productId = params.productId;
    console.log(productId, "checking product id")
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (productId && (!productData._id || productData._id !== productId)) { // Check if product data is already available
            console.log("dispatch?")
            dispatch(fetchData(productId)); // If not, fetch the data
        }
    }, [productId]);


    const productData = useSelector((state: RootState) => state.product.product);
    console.log(productData, "checking product data")
    console.log(productData.userId, "checking vendor id")
    const productStatus = useSelector((state: RootState) => state.product.status);
    const productError = useSelector((state: RootState) => state.product.error);






    if (productStatus === 'loading') {
        console.log(productStatus)
        return <div>Loading product...</div>;
    }

    if (productStatus === 'error') {
        return <div>Error fetching product: {productError}</div>;
    }


    const handleChatWithSeller = async () => {

        if (!session || !session.user || !session.user.name || !session.user.image ) {
            alert("please sign in first")
            return
        }
        setSenderId(session.user.id);
        setReceiverName(senderId === session.user.id ? session.user.name : (productData.userName));
        setReceiverImage(senderId === session.user.id ? session.user.image : (productData.userImage));
        

        console.log(session.user.name,"name")
        console.log(session.user.image,"image")

        console.log(receiverName, "receiverName")
        console.log(receiverImage, "receiverImage")
        
        console.log("buyers id,",senderId)
        setShowChat(true); // Display chat interface
        
        // Add the logic to make API call
        try {
            const response = await fetch('/api/conversations/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    buyerId: session.user.id,
                    buyerName:session.user.name,
                    buyerImage:session.user.image,
                    vendorId: productData.userId, 
                    vendorName:productData.userName,
                    vendorImage:productData.userImage,

                }),
            });console.log

            const data = await response.json();
            
            setConversationId(data.conversationId);
            console.log(data.conversationId, "conversation id")
        } catch (error) {
            console.error("Error initiating conversation:", error);
        }
    };
    
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
                    <button className="add-to-cart-btn w-1/2" onClick={handleChatWithSeller}>Chat with Seller</button>
                </div>


            </div>

            <div className=" flex sm:flex-row flex-col gap-10">
                <CustomerReviews />
                <div className='sm:w-1/2 mt-6'>
                    <h2 className='text-lg font-bold'>Additional Information</h2>
                    <p className='mt-6 '>{product.additionalInfo}</p>
                </div>

            </div>
            {showChat && (
                <ChatInterface
                    onClose={() => setShowChat(false)}
                    receiverName={receiverName}
                    receiverImage={receiverImage}
                    conversationId={conversationId}
                    isMiniChat={true}
                    userId={senderId}

                    
                />
            )}
        </div>
    );
}


export default ProductPage;




.product-page-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem;
    align-items: start;
}

.product-image-section {
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
}



.thumbnail {
    cursor: pointer;
    transition: transform 0.3s;
}

.thumbnail:hover {
    transform: scale(1.1);
}

.product-title {
    font-size: 2rem;
    
}

.product-details-section {
    
    padding: 1rem;
    order: 1;
}

.additional-info-section {
    flex: 2;
    padding: 1rem;
    order: 3;
}


.reviews-container {
    max-width: 500px; /* Adjust as needed */
    margin: 0 auto;
}

.review-box {
    margin-top: 20px;
}

.review-box:first-child {
    border-top: none;
}


.product-price {
    font-size: 1.5rem;
    color: #8cc43c; /* Kgreen */
    margin: 1rem 0;
}

.add-to-cart-btn {
    padding: 0.7rem 1.5rem;
    background-color: #8cc43c; /* Kgreen */
    border: none;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    margin-bottom: 1rem;
    transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
    background-color: #7ab230; /* A slightly darker shade */
}

@media (max-width: 768px) {
    .product-page-container {
        flex-direction: column;
    }

    .product-title {
        font-size: 1.5rem;
    }

    .product-price {
        font-size: 1.2rem;
    }
}
