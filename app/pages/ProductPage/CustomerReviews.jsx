import React from 'react';

const reviews = [
    {
        name: "John Doe",
        rating: 4,
        comment: "Loved the product! Definitely a great buy."
    },
    {
        name: "John Doe",
        rating: 4,
        comment: "Loved the product! Definitely a great buy."
    },
    {
        name: "John Doe",
        rating: 4,
        comment: "Loved the product! Definitely a great buy."
    },
    
    // ... Add more reviews as needed
];

const CustomerReviews = () => {
    return (
        <div className=" bg-white p-4 rounded shadow-md flex flex-col  sm:w-1/2 ">
            <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
            {reviews.map((review, index) => (
                <div key={index} className="review-box border-t border-gray-200 pt-">
                    <strong className="text-md">{review.name}</strong>
                    <p className="my-2">Rating: {Array(review.rating).fill("★").join('')} {Array(5 - review.rating).fill("☆").join('')}</p>
                    <p className="text-gray-600">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default CustomerReviews;
