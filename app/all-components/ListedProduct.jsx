import React, { useState, useEffect } from 'react';
import Products from './Products';

const ListedProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/listedproduct'); // Adjust the URL to your products endpoint
                const data = await response.json();
                console.log(data)
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-xl mb-4">Your Products</h2>
            {products.map(product => (
                <Products key={product._id} product={product} />
            ))}
        </div>
    );
}

export default ListedProduct;
