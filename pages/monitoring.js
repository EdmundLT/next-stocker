/* eslint-disable @next/next/no-img-element */
import Sidebar from "../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import MarketIndex from "../components/MarketIndex";

function Monitoring() {
  const [user] = useAuthState(auth);
  return (
    <div className="bg-[#2C3333] h-screen overflow-hidden">
      <Sidebar />
      <div className=" text-white overflow-y-scroll scrollbar-hide">
      <MarketIndex />
      </div>
    </div>
  );
}

export default Monitoring;
