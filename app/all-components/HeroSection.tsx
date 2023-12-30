import React from 'react';
import "@/app/styles/herosection.css"
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar';
import { AppDispatch } from '@/app/redux/store'
import { useDispatch } from 'react-redux';
import { startSearch, searchSuccess, searchFailure } from '../redux/features/productsearchpage/productsearchpageSlice'

const HeroSection = () => {

  const dispatch: AppDispatch = useDispatch();
    const router = useRouter()

    const executeSearch = async (query:string, setIsLoading:Function) => {
        try {
          // Start the loading state in the SearchBar
          setIsLoading(true);
          dispatch(startSearch());
          const response = await fetch(`/api/searchProduct?query=${query}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          // Here, you can set the data to a state and display the results on your frontend.
          console.log(data, "before dispatch")
          // Dispatch the search results to the Redux store
          dispatch(searchSuccess(data));
    
    
        } catch (error) {
          console.error("There was a problem with the fetch operation:", (error as Error).message);
          // Dispatch an error to the Redux store
          dispatch(searchFailure((error as Error).message));
          // Handle errors as needed. Maybe set an error state and display it to the user.
        } finally {
          // End the loading state in the SearchBar
          setIsLoading(false);
        }
      };



    
    return (
        <div className="hero-container sm:h-screen flex-col">
        

        <SearchBar location='hero' onSearch={executeSearch}/>
            <div className="hero-content ">
                <span className="karkhanay-title animate-charcter justify-center mx-2 ">KARKHANAY</span>
                
                <h1 className='  font-semibold italic text-lg'>Revolutionizing Industrial Shopping</h1>
                
                
                <button className="hero-cta mt-4 p-4 font bg-Kblue hover:font-bold hover:text-black font-semibold text-orange-500 hover:bg-Kgreen" onClick={()=>router.push('/pages/VendorRegistration')}>Become a seller now</button>
            </div>
        </div>
    );
};

export default HeroSection;
