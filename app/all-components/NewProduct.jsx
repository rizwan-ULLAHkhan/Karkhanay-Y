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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic, e.g., upload images, save the product to the database, etc.
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
