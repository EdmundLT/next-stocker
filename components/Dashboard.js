/* eslint-disable @next/next/no-img-element */
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import MarketIndex from "./MarketIndex";
function Dashboard() {
  const [user] = useAuthState(auth);
  const [testdata, fetchData] = useState({});

  const GetData = () => {
    fetch('http://localhost:8000/stocks/TSLA')
    .then(response => response.json())
    .then(data => fetchData(data));
  }

  useEffect(() => {
    GetData()
  }, [])
  
  return (
    <div className=" text-[#E7F6F2] h-screen overflow-y-scroll scrollbar-hide item">
      <div className="m-10">
      <p className="text-3xl font-semibold"> Hello, {user.displayName}</p>
      <p>{moment().format('MMMM DD YYYY')}</p>
      </div>
      
      <MarketIndex />
    </div>
  );
}

export default Dashboard;
