'use client'
// components/Dashboard.js
import { useState } from 'react';
import Products from './Products';
import NewProduct from './NewProduct'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="p-4 md:p-8">
      <div className="border-b-2 mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 1 ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          General Info
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 2 ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Listed Products
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 3 ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab(3)}
        >
          New Product
        </button>
      </div>

      {activeTab === 1 && <GeneralInfo />}
      {activeTab === 2 && <ListedProducts />}
      {activeTab === 3 && <NewProduct />}
    </div>
  );
}

function GeneralInfo() {
  return (
    <div>
      <h2 className="text-xl mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded">
          <p>Total Sales</p>
          <p className="text-lg">$1234.56</p>
        </div>
        <div className="p-4 border rounded">
          <p>New Inquiries</p>
          <p className="text-lg">5</p>
        </div>
        {/* ... other metrics ... */}
      </div>
    </div>
  );
}


function ListedProducts() {
  const products = [
    {
      id: 1,
      name: "Industrial Machine A",
      price: "$500",
      quantity: 5,
      images: ["url1.jpg", "url2.jpg"]
    },
    {
      id: 2,
      name: "Toolset B",
      price: "$100",
      quantity: 50,
      images: ["url3.jpg"]
    },
    // ... more products ...
  ];

  return (
    <div>
      <h2 className="text-xl mb-4">Your Products</h2>
      {products.map(product => (
        <Products key={product.id} product={product} />
      ))}
    </div>
  );
}



