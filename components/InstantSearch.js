import { SearchIcon } from "@heroicons/react/outline";
import { Button, Input } from "@mui/material";
import { useState } from "react";

function InstantSearch() {
  const [result, setResult] = useState();
  const [QSInput, setQSInput] = useState("");

  function quickSearch() {
    fetch(`api/stocks?symbol=${QSInput}`)
      .then((response) => response.json())
      .then((data) => setResult(data));
  }

  return (
    <div className="">
      <div className="flex space-x-8">
        <p className="text-2xl">Quick Search</p>
        <Input
          className="bg-[#E7F6F2] rounded-md px-4"
          placeholder="symbol e.g. AAPL"
          onChange={(e) => setQSInput(e.target.value.toUpperCase())}
        />
        <SearchIcon className="w-10 h-10 cursor-pointer" onClick={quickSearch} />
      </div>
      {result ? (
        <div>
          <div className="flex text-sm font-Roboto font-semibold">
            <div className="text-left py-4 w-1/6 text-slate-50 font-semibold">
              {result.percentage > 0 ? (
                <span className=" bg-green-500 rounded-lg text-xs p-2 shadow-md">
                  {result.symbol}
                </span>
              ) : (
                <span className="bg-red-500 rounded-lg text-xs px-3 py-2 shadow-md">
                  {result.symbol}
                </span>
              )}
            </div>

            <div className="text-left py-4 w-2/6">
              <a
                href={`https://finance.yahoo.com/quote/${result.symbol}`}
                target="_blank"
                rel="noreferrer"
              >
                {result.name}
              </a>
            </div>

            <div className="text-left py-4 w-1/6">${result.prevClose}</div>
            <div className="text-left py-4 w-1/6">${result.price}</div>
            <div className="py-4 w-1/6 font-bold">
              {result.percentage > 0 ? (
                <span className="text-green-500 ">
                  {Math.floor(result.percentage * 100) / 100}%
                </span>
              ) : (
                <span className="text-red-500">
                  {Math.floor(result.percentage * 100) / 100}%
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InstantSearch;
