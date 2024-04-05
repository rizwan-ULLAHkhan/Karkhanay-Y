import React from 'react'
import DropdownMenu from '@/app/small-components/dropdown/homepagedropdown'
import '../NavBar2/NavBar2.css'



const Navbar2 = () => {




  
  return (
    <nav className="navbar justify-between px-20  ">
      <DropdownMenu />
      <div className='flex '>
      <div className="nav-item"><a href="#">Home</a></div>
      <div className="nav-item"><a href="#">About Us</a></div>
      <div className="nav-item"><a href="#">Contact Us</a></div>
      <div className="nav-item"><a href="#">Social Media</a></div>
      <div className="nav-item"><a href="#">About Pakistan</a></div>
      </div>
    </nav>
  );
};

export default Navbar2;
