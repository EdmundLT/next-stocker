/* eslint-disable @next/next/no-img-element */
import {
  TemplateIcon,
  LogoutIcon,
  CollectionIcon,
  CurrencyDollarIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

function Sidebar() {
  const router = useRouter();
  const [time, setTime] = useState();
  const [user] = useAuthState(auth);
  const getTime = () => {
    let now = moment().format("MMMM DD YYYY hh:mm:ss a");
    setTime(now);
  };

  setInterval(() => {
    getTime();
  }, 1000);


  const signOut = () => {
    auth.signOut();
  };


  return (
    <div
      className="p-5 m-4 bg-[#395B64] rounded-lg text-white font-semibold text-base botder-r border-gray-900 
    overflow-y-scroll h-screen scrollbar-hide justify-center min-w-[16rem] sm:max-w-[18rem] lg:max-w-[21rem] hidden md:inline-flex pb-36"
    >
    <header className="absolute top-5 right-8">

        <div
          className="flex items-center space-x-3 bg-black 
            opacity-90 hover:opacity-80 rounded-full p-1 pr-6 text-white"
        >
          <img className="rounded-full w-10 h-10" src={user.photoURL} alt="googleAvatar" />
          <h2>{user.displayName}</h2>
        </div>
      </header>
      <div className="space-y-12">
        <p className="text-3xl font-bold text-center">Stocker</p>

        {/* Time */}
        <div className="text-center">{time}</div>

        <hr className="border-t-[0.1px] border-gray-100" />
        <button className="flex items-center space-x-2 hover:text-black" onClick={()=>{router.push('/')}}>
          <TemplateIcon className="h-5 w-5" />
          <p>Monitoring Dashboard</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-black"
        onClick={()=>{router.push('/editwatchlist')}}>
          <CollectionIcon className="h-5 w-5" />
          <p>Edit Watchlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-black"
        onClick={()=>{router.push('/news')}}>
          <RssIcon className="h-5 w-5" />
          <p>News</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-100" />
        <button className="flex items-center space-x-2 hover:text-black"
        // onClick={()=>{router.push('/currencyex')}}
        >
          <CurrencyDollarIcon className="h-5 w-5" />
          <p>Currency Exchange</p>
        </button>
        <span className="text-xs">Coming Soon..</span>

        <button className="flex items-center space-x-2 hover:text-black"
        onClick={()=>{router.push('https://www.buymeacoffee.com/stockerio')}}>
          <HeartIcon className="h-5 w-5" />
          <p>Donate</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-black" onClick={() => signOut()}>
          <LogoutIcon className="h-5 w-5" />
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
