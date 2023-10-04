'use client'
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import  addToCart  from '../redux/features/cart/cartSlice'

const Product = () => {
const dispatch=useDispatch();
const[cartvalue,setCartvalue]= useState(0);

  const addToCartHandler=(e)=>{
    e.preventDefault()
  const updatedCartValue = cartvalue + 1;
  setCartvalue(updatedCartValue);
    
    dispatch(addToCart(cartvalue))
  }

  

  const dummyProduct = { name: 'Dummy Product', price: 10.99 }; // Dummy product details
  


  return (
    <div className=' border-2 m-2 flex flex-col  bg-red-200 p-2'>
      <h1>Product Page</h1>
      <div>
        <h2>{dummyProduct.name}</h2>
        <p>Price: ${dummyProduct.price}</p>
        <button onClick={addToCartHandler}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
