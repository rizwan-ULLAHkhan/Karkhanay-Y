'use client'
import Image from 'next/image'
import { useState } from 'react';

import { Provider } from 'react-redux'
import HeroSection from '@/app/all-components/HeroSection'
import store from '../app/redux/store'
import MBannerText from './all-components/MBannerText'
import TopTrending from './all-components/TopTrending'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Dashboard from "./all-components/Dashboard"
import CategoryCard from './all-components/Categorycard/Categorycard';




export default function Home() {
  const router = useRouter()
  const imageUrls = [
    '/k2.jpeg',
    '/k1.jpeg',
    // Add more video URLs as needed
  ];

  return (

    <main className="">


      <div>
        <HeroSection />
        <div
          style={{
            backgroundImage: 'url(/hero4.jpg)',
            backgroundRepeat: 'no-repeat',
            
            
            width: '100%', // You might want to set a specific height
            height:'480px',
            display: 'flex',
            flexDirection: 'column', // Stack items vertically
           
            alignItems: 'center', // Center items horizontally
          }}
        >
          <h1 className='font-semibold italic text-lg'>
            Revolutionizing Industrial Shopping
          </h1>

          <button
            className="hero-cta mt-4 p-4 font bg-Kblue hover:font-bold hover:text-black font-semibold text-Korange hover:bg-Kgreen"
            onClick={() => router.push('/pages/VendorRegistration')}
          >
            Become a seller now
          </button>
        </div>

      </div>


      <CategoryCard/>
      
      <TopTrending />
      






    </main>
  )
}
