import { PlusCircleIcon } from "@heroicons/react/outline";
import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/Sidebar";
import StockList from "../components/StockList";
import { auth, db } from "../firebase";
function Editwatchlist() {
  const [watchlist, setWatchilist] = useState([]);
  const [symbolInput, setSymbolInput] = useState("");
  const [user] = useAuthState(auth);
  const docRef = db.collection("users").doc(user.uid);


  function loadWatchlist() {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setWatchilist(doc.data().watchlist);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  async function addToWatchList() {
    if (symbolInput === "") {
      return alert("Please enter a correct symbol");
    }
    fetch(`http://localhost:8000/stocks/${symbolInput}`)
      .then((response) => response.json())
      .then((data) =>
        docRef.update({
          watchlist: [...watchlist, { symbol: symbolInput, name: data.name }],
        })
      );
    loadWatchlist();
  }

  useEffect(() => {
    loadWatchlist();
  }, [watchlist]);

  return (
    <div className="bg-[#2C3333] h-screen overflow-hidden flex text-[#E7F6F2]">
      <Sidebar />
      <div className="pt-10 mx-auto text-center flex-1">
        <p className="pb-10 text-3xl font-semibold">Edit your Watchlist</p>

        <p>Click + Button to add stock to your watchlist</p>
        <p>Add &quot;.TW&quot; if it&apos;s Taiwan Stock </p>

        <div className="p-4 space-y-4">
          {watchlist.map((stock) => (
            <StockList
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.name}
            />
            
          ))}
          <div className="space-y-4">
            <p>Symbol</p>
            <Input
              className="bg-[#E7F6F2] rounded-xl px-4"
              onChange={(e) => setSymbolInput(e.target.value)}
            />
          </div>
          <PlusCircleIcon
            className="w-10 h-10 mx-auto cursor-pointer"
            onClick={addToWatchList}
          />
        </div>
      </div>
    </div>
  );
}

export default Editwatchlist;
