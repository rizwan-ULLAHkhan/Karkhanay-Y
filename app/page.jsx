'use client'
import Image from 'next/image'
import { useState } from 'react';

import { Provider } from 'react-redux'
import HeroSection from '@/app/all-components/HeroSection'
import store from '../app/redux/store'
import MBannerText from './all-components/MBannerText'
import M2TopTrending from './all-components/TopTrending'
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
      
      
      
      <HeroSection/>
      
      
      <M2TopTrending/>
      
      


      
     
    </main>
  )
}
