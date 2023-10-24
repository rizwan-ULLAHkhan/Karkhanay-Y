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
    <nav className=" bg-slate-700 flex items-center justify-between px-3 shadow-lg">
      <Link className="flex items-center font-mono gap-2" href='/'>
        <div className="py-1  mb-1 ">
          <Image className='' src="/logo.png" alt="Logo" width={42} height={42} />
        </div>
        <div className=" text-white font-bold text-lg ">Karkhanay</div>
      </Link>

      <SearchBar onSearch='' />

      <div className="font-mono gap-2 flex items-center">
        {session && (
          <Link 
            href="/pages/Dashboard" 
            className="mr-4 text-white hover:text-gray-400 cursor-pointer"
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
              <Image src={session.user.image} alt="User Avatar" width={42} height={42} className="mr-2" />
            )}
            <Button className="bg-Kred hover:border border-K text-white text-xs" onClick={() => signOut()}>
              Sign-out
            </Button>
          </>
        )}

        <Link 
            href="/path-to-cart" 
            className="ml-4 text-white hover:text-gray-400 cursor-pointer"
        >
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
