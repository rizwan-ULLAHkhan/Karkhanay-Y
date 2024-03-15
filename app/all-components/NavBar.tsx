import '../globals.css'
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AppDispatch } from '@/app/redux/store'
import { useDispatch } from 'react-redux';
import { startSearch, searchSuccess, searchFailure } from '../redux/features/productsearchpage/productsearchpageSlice'

interface NavBarProps {
  showSearchBar: boolean;
}

const NavBar = ({ showSearchBar }: NavBarProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();



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
    <nav className="  bg-black flex flex-wrap items-center lg:justify-between justify-center px-3 shadow-lg">
      <Link className="flex items-center font-mono gap-2 sm:mr-6" href='/'>
        <div className="py-1  mb-1 ">
          <Image className=' ' src="/logo.png" alt="Logo" width={42} height={42} />
        </div>
        <div className=" text-Kgray font-bold text-lg ">Karkhanay</div>
      </Link>

      {showSearchBar &&<SearchBar onSearch={executeSearch}  location='navbar'/>}

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
          href='/pages/ChatApp'
          className=" text-Kgray hover:text-gray-400 cursor-pointer"
        >
          Chat
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
