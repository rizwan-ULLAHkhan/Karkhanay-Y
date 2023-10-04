'use client'
import Image from 'next/image'
import Product from './all-components/Product'
import { useState } from 'react';
import SearchBarSM from './all-components/SearchBar-sm';
import { Provider } from 'react-redux'
import Navbar from './all-components/NavBar';
import store from '../app/redux/store'
import BImageCarousel from '@/app/all-components/Carousel'
import { SessionProvider } from "next-auth/react"
import Dashboard from "./all-components/Dashboard"




export default function Home() {
  const imageUrls = [
    '/k2.jpeg', 
    '/k1.jpeg', 
    // Add more video URLs as needed
  ];

  return (
    
    <main className="">
      <Provider store={store}>
      <Navbar/>
      <SearchBarSM/>
      <Dashboard/>

      {/* <div className='flex flex-col'>
        
      
      <BImageCarousel imageUrls={imageUrls} idforswipe={1}/>
      <Product/>
      </div> */}
      </Provider>
    </main>
  )
}
