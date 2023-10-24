'use client'
import Image from 'next/image'
import { useState } from 'react';
import SearchBarSM from './all-components/SearchBar-sm';
import { Provider } from 'react-redux'
import Navbar from './all-components/NavBar';
import store from '../app/redux/store'
import MBannerText from './all-components/MBannerText'
import M2TopTrending from './all-components/M2TopTrending'
import Link from 'next/link';


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
      
      <SearchBarSM/>
      
      {/* <Dashboard/> */}
      <M2TopTrending/>


      {/* <div className='flex flex-col'>
        
      
      <BImageCarousel imageUrls={imageUrls} idforswipe={1}/>
      <Product/>
      </div> */}
      </Provider>
    </main>
  )
}
