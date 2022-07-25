import { useEffect, useState } from "react";
const axios = require("axios").default;
function MarketIndex() {
  const USSymbol = ["^GSPC", "^DJI", "^IXIC"];
  const [IndexList, setIndexList] = useState([]);
  async function getMarketIndex() {
    let temp = [];
    for (var i = 0; i < USSymbol.length; i++) {
      await axios
        .get(`api/stocks?symbol=${USSymbol[i]}`)
        .then(function (response) {
          const data = response.data;
          temp.push(data);
          return data;
        })
        .catch(function (error) {
          console.log(error);
          return error;
        });
    }
    setIndexList(temp);
  }

  useEffect(() => {
    getMarketIndex();
    const interval = setInterval(() => {
      getMarketIndex();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:w-max gap-8 w-auto px-4 mx-auto">
      {IndexList.map((index) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="p-4 bg-[#E7F6F2] text-[#2C3333] rounded-lg">
            <p className="text-2xl p-2 font-semibold">{index.name}</p>
            <p className="text-xl p-2">{index.price}</p>
            {index.percentage > 0 ? (
              <span className="text-green-500 font-semibold p-2">
                {Math.floor(index.percentage * 100) / 100}%
              </span>
            ) : (
              <span className="text-red-500 font-semibold p-2">
                {Math.floor(index.percentage * 100) / 100}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MarketIndex;
