/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

function Stock() {
  const [user] = useAuthState(auth);
  const docRef = db.collection("users").doc(user.uid);
  const [tempWatchlist, setTempWatchilist] = useState([]);


  function loadWatchlist() {
    docRef
      .get()
      .then((doc) => {
        console.log(doc.data().watchlist);
        if (doc.data().watchlist) {
          setTempWatchilist(doc.data().watchlist);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  useEffect(() => {
    loadWatchlist()
  }, []);

  return (
    <div>
      <div>
        <div className="flex text-xl font-bold">
          <div className="text-left py-4 w-1/6">Symbol</div>
          <div className="text-left py-4 w-2/6">Company</div>
          <div className="text-left py-4 w-1/6">Previous Close</div>
          <div className="text-left py-4 w-1/6">Price</div>
          <div className="py-4 w-1/6">Percentage</div>
        </div>
        {tempWatchlist.map((stock) => {
          return (
            <div>
              <div className="flex text-sm font-Roboto font-semibold">
                <div className="text-left py-4 w-1/6 text-slate-50 font-semibold">
                  {stock.fdata.percentage > 0 ? (
                    <span className=" bg-green-500 rounded-lg text-xs p-2 shadow-md">
                      {stock.symbol}
                    </span>
                  ) : (
                    <span className="bg-red-500 rounded-lg text-xs px-3 py-2 shadow-md">
                      {stock.symbol}
                    </span>
                  )}
                </div>

                <div className="text-left py-4 w-2/6">
                  <a
                    href={`https://finance.yahoo.com/quote/${stock.fdata.symbol}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {stock.fdata.name}
                  </a>
                </div>

                <div className="text-left py-4 w-1/6">
                  ${stock.fdata.prevClose}
                </div>
                <div className="text-left py-4 w-1/6">${stock.fdata.price}</div>
                <div className="py-4 w-1/6 font-bold">
                  {stock.fdata.percentage > 0 ? (
                    <span className="text-green-500 ">
                      {Math.floor(stock.fdata.percentage * 100) / 100}%
                    </span>
                  ) : (
                    <span className="text-red-500">
                      {Math.floor(stock.fdata.percentage * 100) / 100}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stock;
