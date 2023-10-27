import '../globals.css'
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="  bg-Kblue flex flex-wrap items-center  lg:justify-between justify-center px-3 shadow-lg">
      <Link className="flex items-center font-mono gap-2 sm:mr-6" href='/'>
        <div className="py-1  mb-1 ">
          <Image className=' ' src="/logo.png" alt="Logo" width={42} height={42} />
        </div>
        <div className=" text-Kgray font-bold text-lg ">Karkhanay</div>
      </Link>

      <SearchBar onSearch='' />

      <div className="font-mono gap-2 flex items-center ml-4 lg:mb-0 mb-2">
        {session && (
          <Link 
            href="/pages/Dashboard" 
            className="mr-4 text-Kgray hover:text-gray-400 cursor-pointer"
          >
            Dashboard
          </Link>
        )}

        {!session ? (
          <Button className="bg-Kgreen hover:border border-K text-white text-xs" onClick={() => signIn("google")}>
            Sign-in
          </Button>
        ) : (
          <>
            {session.user && session.user.image && (
              <Image src={session.user.image} alt="User Avatar" width={42} height={42} className="rounded-full" />
            )}
            <Button className="bg-Kred hover:border border-K text-Kgray text-xs" onClick={() => signOut()}>
              Sign-out
            </Button>
          </>
        )}

        <Link 
            href="/path-to-cart" 
            className=" text-Kgray hover:text-gray-400 cursor-pointer"
        >
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
