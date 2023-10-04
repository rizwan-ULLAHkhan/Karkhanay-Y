import '../globals.css'

import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import {useSelector } from 'react-redux'


//https://cdn.sanity.io/files/cqojtdan/production/f2d9506ea72a9e2dc2c0c90c0c2d07b74ef320c2.mp4
const NavBar = () => {
  const session=useSession();
  useSelector((state)=>{console.log(state)})
  
  return (
    
    <nav className=" bg-slate-700 flex items-center justify-between px-3   shadow-lg">
      <div className="flex items-center font-mono gap-2">
        <div className="py-1  mb-1 ">
          <Image className='' src="/logo.png"  alt="Logo" width={42} height={42} />
        </div>
        <div className=" text-white font-bold text-lg ">Karkhanay</div>
      </div>

  
      <SearchBar onSearch=''/>

      <div className=" font-mono gap-2 flex ">
        <Button className=" bg-Kgreen hover:border border-K text-white text-xs" onClick={()=>signIn("google")}>Sign-in</Button>
        <a>
          Cart
        </a>
      </div>


    </nav>
  );
};

export default NavBar;
