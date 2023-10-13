import React, { useState, useEffect } from 'react';
import Products from './Products';
import { useSession } from 'next-auth/react';


const ListedProduct = () => {
    const [products, setProducts] = useState([]);
    const { data: session } = useSession();
    const userEmail = session?.user?.email;


    const handleStockChange = async (productToUpdate) => {
        const newInStockValue = !productToUpdate.inStock; // toggle the current value
        console.log(productToUpdate._id)
        try {
            const response = await fetch(`/api/productdatachange/${productToUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'User-Email': userEmail,  
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


    const handleDelete = async (product) => {
        const confirmation = window.confirm('Are you sure you want to delete this product?');
        console.log("ye wala", product._id)
        if (!confirmation) return;

        try {
            const response = await fetch(`/api/productdatachange/${product._id}`, {
                method: 'DELETE',
                headers: {
                    'User-Email': userEmail,                    
                  },

            });

            if (response.ok) {
                // Remove the product from the UI by fetching products again or filtering out the deleted one
                // Option 1: refetch products
                console.log("fetch product accessed")
                setProducts(prevProducts => prevProducts.filter(p => p._id !== product._id));

                // Option 2: filter out the deleted product from state
                // setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
            } else {
                console.error("Failed to delete productsss.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchProducts = async () => {
        try {
             

            const response = await fetch(`/api/listedproduct?timestamp=${new Date().getTime()}`, {
                headers: {
                  'User-Email': userEmail,                    // Adjust the URL to your products endpoint
                },
              });
            const data = await response.json();
            console.log(data)
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };



    useEffect(() => {


        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-xl mb-4">Your Products</h2>
            {products.map(product => (
                <Products key={product._id} product={product} handleStockChange={handleStockChange} handleDelete={handleDelete} />
            ))}
        </div>
    );
}

export default ListedProduct;
