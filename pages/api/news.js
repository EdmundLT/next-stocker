// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const yahooFinance = require('yahoo-finance')
const axios = require("axios");
export default function handler(req, res) {
    const DEMO_URL =
    "https://eodhistoricaldata.com/api/news?api_token=demo&s=AAPL.US&offset=0&limit=5";
  axios
    .get(DEMO_URL)
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
