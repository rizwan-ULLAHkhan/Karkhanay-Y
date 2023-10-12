import '../globals.css'

import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useSession, signIn, signOut, Provider } from "next-auth/react"
import Image from 'next/image';
import { useSelector } from 'react-redux'


const NavBar = () => {
  const { data: session } = useSession();
  console.log(session)
  useSelector((state) => { console.log(state) })

  return (

    <nav className=" bg-slate-700 flex items-center justify-between px-3   shadow-lg">
      <div className="flex items-center font-mono gap-2">
        <div className="py-1  mb-1 ">
          <Image className='' src="/logo.png" alt="Logo" width={42} height={42} />
        </div>
        <div className=" text-white font-bold text-lg ">Karkhanay</div>
      </div>


      <SearchBar onSearch='' />

      <div className="font-mono gap-2 flex ">
        {!session ? (
          <Button className="bg-Kgreen hover:border border-K text-white text-xs" onClick={() => signIn("google")}>
            Sign-in
          </Button>
        ) : (
          <>
            {session.user && session.user.image && (
              <Image src={session.user.image} alt="User Avatar" width={42} height={42} />
            )}
            <Button className="bg-Kred hover:border border-K text-white text-xs" onClick={() => signOut()}>
              Sign-out
            </Button>
          </>
        )}
        <a>Cart</a>
      </div>
    </nav>
  );
};

export default NavBar;
