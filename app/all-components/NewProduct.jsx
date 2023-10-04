'use client'
import { useState } from 'react';

export default function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImages, setProductImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(prevImages => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('quantity', productQuantity);
    productImages.forEach(image => formData.append('images', image));
  
    try {
      const response = await fetch('/api/newproduct', {
        method: 'POST',
        body: formData,
    });
    
    if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        // handle the error, maybe set an error state or show a notification to the user
        return;
    }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div>
      <h2 className="text-xl mb-4">Add New Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName" className="block mb-2">Product Name</label>
          <input 
            type="text" 
            id="productName" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            className="border w-full p-2 rounded" 
          />
        </div>
        <div>
          <label htmlFor="productDesc" className="block mb-2">Description</label>
          <textarea 
            id="productDesc" 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)} 
            className="border w-full p-2 rounded" 
            rows="5"
          ></textarea>
        </div>
        <div>
          <label htmlFor="productPrice" className="block mb-2">Price</label>
          <input 
            type="number" 
            id="productPrice" 
            value={productPrice} 
            onChange={(e) => setProductPrice(e.target.value)} 
            className="border w-full p-2 rounded" 
          />
        </div>
        <div>
          <label htmlFor="productQuantity" className="block mb-2">Quantity</label>
          <input 
            type="number" 
            id="productQuantity" 
            value={productQuantity} 
            onChange={(e) => setProductQuantity(e.target.value)} 
            className="border w-full p-2 rounded" 
          />
        </div>
        <div>
          <label className="block mb-2">Product Images</label>
          <input 
            type="file" 
            multiple 
            onChange={handleImageChange} 
            className="border p-2 rounded w-full"
          />
          <ul className="mt-2 space-y-2">
            {productImages.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{file.name}</span>
                <button 
                  onClick={() => setProductImages(prev => prev.filter((_, i) => i !== index))} 
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">List Product</button>
      </form>
    </div>
  );
}
