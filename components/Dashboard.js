/* eslint-disable @next/next/no-img-element */
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import MarketIndex from "./MarketIndex";
import Stock from "./Stock";
import News from "./News";
import InstantSearch from "./InstantSearch";
function Dashboard() {
  const [user] = useAuthState(auth);
  const docRef = db.collection("users").doc(user.uid);
  const [watchlist, setWatchlist] = useState([]);
  const [symbollist, setSymbollist] = useState([]);
  function loadSymbollist() {
    docRef
      .get()
      .then((doc) => {
        setSymbollist(doc.data().watchlistSymbol);
        setWatchlist(doc.data().watchlist);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  function updateFdata() {
    loadSymbollist();
    symbollist.forEach((symbol) => {
      fetch(`api/stocks?symbol=${symbol}`)
        .then((response) => response.json())
        .then((data) =>
          docRef.update({
            watchlist: [
              ...watchlist,
              {
                symbol: symbolInput.toUpperCase(),
                name: data.name,
                fdata: data,
              },
            ],
          })
        );
    });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      updateFdata();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" text-[#E7F6F2] h-screen overflow-y-scroll scrollbar-hide w-screen">
      <div className="m-10">
        <p className="text-3xl font-semibold"> Hello, {user.displayName}</p>
      </div>
      <div className="pb-2">
        <MarketIndex />
      </div>
      <div className="p-4 ">
        <Stock />
      </div>
      <div>
        <InstantSearch />
      </div>
    </div>
  );
}

export default Dashboard;
