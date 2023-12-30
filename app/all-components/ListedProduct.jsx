import React, { useState, useEffect } from 'react';
import Products from './Products';
import { useSession } from 'next-auth/react';




const ListedProduct = () => {
    const [notification, setNotification] = useState({ visible: false, message: '' });
    const [products, setProducts] = useState([]);
    const { data: session } = useSession();
    const [modal, setModal] = useState({ visible: false, message: '' });
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

                return;
            }
        } catch (error) {
            console.error("Error:", error);

            return;
        }
    };


    const handleDelete = async (product) => {
        const confirmation = window.confirm('Are you sure you want to delete this product?', product._id);
        if (!confirmation) return;

        // Mark the product as deleted (isDeleted: true)
        try {
            const markAsDeletedResponse = await fetch(`/api/productdatachange/${product._id}`, {
                method: 'PUT',
                headers: {
                    'User-Email': userEmail,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isDeleted: true }), // Update isDeleted to true
            });

            if (!markAsDeletedResponse.ok) {
                throw new Error("Failed to mark product as deleted.");
            }

            // Attempt to delete the product from the database and Sanity
            const deleteResponse = await fetch(`/api/productDelete/${product._id}`, {
                method: 'PUT', // Note: Should ideally be 'DELETE' if it aligns with your server setup
                headers: {
                    'User-Email': userEmail,
                },
            });

            if (!deleteResponse.ok) {
                throw new Error("Failed to delete product.");
            }

            // Remove the product from the UI
            setProducts(prevProducts => prevProducts.filter(p => p._id !== product._id));
            setModal({
                visible: true,
                message: 'deleted successfully!',
                color: 'text-green-500'
            });

            setTimeout(() => {
                setModal({ visible: false, message: '' });
            }, 3000);

        } catch (error) {
            console.error("Error:", error);
            setNotification({ visible: true, message: 'Failed to delete product. Please try again.' });


            // Rollback: Mark the product as not deleted
            await fetch(`/api/productdatachange/${product._id}`, {
                method: 'PUT',
                headers: {
                    'User-Email': userEmail,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isDeleted: false }), // Set isDeleted back to false
            });
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
            {modal.visible && (
                <div className={`modal-content ${modal.color} `}>
                    <p>{modal.message}</p>
                </div>
            )}
            {products
                .filter(product => !product.isDeleted)
                .map(product => (
                    <Products key={product._id} product={product} handleStockChange={handleStockChange} handleDelete={handleDelete} />
                ))}
        </div>
    );
}

export default ListedProduct;






// try {
//     // First, mark the product as non-deleted (isDeleted: false) with a PUT request
//     const markAsDeletedResponse = await fetch(`/api/productdatachange/${product._id}`, {
//         method: 'PUT',
//         headers: {
//             'User-Email': userEmail,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ isDeleted: false }), // Update isDeleted to true
//     });

//     if (!markAsDeletedResponse.ok) {
//         console.error("Failed to mark product as deleted.");
//         setNotification({ visible: true, message: 'Failed to delete product. Please try again.' });
//         return;
//     }

//     // // add the product nack from to UI by filtering it out
//     setProducts(prevProducts => prevProducts.filter(p => p._id !== product._id));
//     console.log("chnage and return")

// } catch (error) {
//     console.error("Error:", error);
//     setNotification({ visible: true, message: 'Failed to delete product. Please try again.' });
//     return;
// }