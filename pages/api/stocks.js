// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const yahooFinance = require('yahoo-finance')

export default function handler(req, res) {
  const symbol = req.query.symbol;
  yahooFinance.quote(
    {
      symbol: symbol,
      module: ["price"],
    },
    function (err, quote) {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err,
        });
      }
      return res.status(200).json({
        symbol: symbol,
        status: "success",
        name:quote.price.shortName,
        prevClose: quote.price.regularMarketPreviousClose,
        price: quote.price.regularMarketPrice,
        percentage: quote.price.regularMarketChangePercent * 100,
      });
    }
  );
}
