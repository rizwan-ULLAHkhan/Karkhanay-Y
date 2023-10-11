import React, { useState, useEffect } from 'react';
import Products from './Products';

const ListedProduct = () => {
    const [products, setProducts] = useState([]);

    const handleStockChange = async (productToUpdate) => {
        const newInStockValue = !productToUpdate.inStock; // toggle the current value

        try {
            const response = await fetch(`/api/productdatachange/${productToUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inStock: newInStockValue }),
            });

            if (response.ok) {
                // Update local state or refetch products, so UI is in sync with the database
                // For simplicity, I'm just logging here
                setProducts(prevProducts => prevProducts.map(product =>
                    product._id === productToUpdate._id
                        ? { ...product, inStock: newInStockValue }
                        : product
                ));
                console.log("Updated successfully!");
            } else {
                console.error("Failed to update product.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };







    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/listedproduct?timestamp=${new Date().getTime()}`); // Adjust the URL to your products endpoint
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
                <Products key={product._id} product={product} handleStockChange={handleStockChange} />
            ))}
        </div>
    );
}

export default ListedProduct;
