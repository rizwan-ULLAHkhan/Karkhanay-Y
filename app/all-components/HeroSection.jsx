import React from 'react';
import "@/app/styles/herosection.css"
import { useRouter } from 'next/navigation'

const HeroSection = () => {


    const router = useRouter()





    
    return (
        <div className="hero-container sm:h-screen ">
        

            
            <div className="hero-content">
                <span className="karkhanay-title animate-charcter justify-center mx-2 ">KARKHANAY</span>
                <h1 className='  font-semibold italic text-lg'>Revolutionizing Industrial Shopping</h1>
                
                
                <button className="hero-cta mt-4 p-4 font bg-Kblue hover:font-bold hover:text-black font-semibold text-orange-500 hover:bg-Kgreen" onClick={()=>router.push('/pages/VendorRegistration')}>Become a seller now</button>
            </div>
        </div>
    );
};

export default HeroSection;
