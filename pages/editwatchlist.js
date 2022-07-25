import { PlusCircleIcon } from "@heroicons/react/outline";
import { Input } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/Sidebar";
import StockList from "../components/StockList";
import { auth, db } from "../firebase";
function Editwatchlist() {
  const [watchlist, setWatchilist] = useState([]);
  const [watchlistSymbol, setWatchilistSymbol] = useState([]);
  const [symbolInput, setSymbolInput] = useState("");
  const [user] = useAuthState(auth);
  const docRef = db.collection("users").doc(user.uid);


  function loadWatchlist() {
    docRef
      .get()
      .then((doc) => {
        console.log()
        if (doc.data().watchlist && doc.data().watchlistSymbol) {
          setWatchilist(doc.data().watchlist);
          setWatchilistSymbol(doc.data().watchlistSymbol)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          docRef.set({watchlist: [], watchlistSymbol: []})
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
    console.log(docRef.docs)
    fetch(`api/stocks?symbol=${symbolInput}`)
      .then((response) => response.json())
      .then((data) =>
        docRef.update({
          watchlist: [...watchlist, { symbol: symbolInput.toUpperCase(), name: data.name, fdata: data }],
          watchlistSymbol: [...watchlistSymbol, symbolInput]
        })
      );
    loadWatchlist();
  }

  useEffect(() => {
    loadWatchlist();
  }, [watchlist]);

  return (
    <div className="bg-[#2C3333] h-screen overflow-hidden flex text-[#E7F6F2]">
    <Head>
      <title>Edit Watchlist</title>
      <meta name="description" content="Stalk Your Stock" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Sidebar />
      <div className="pt-10 mx-auto text-center flex-1">
        <p className="pb-10 text-3xl font-semibold">Edit your Watchlist</p>

        <p>Click + Button to add stock to your watchlist</p>
        <p>Add &quot;.TW&quot; if it&apos;s Taiwan Stock </p>

        <div className="p-4 space-y-4">
          {watchlist && watchlist.map((stock) => (
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
