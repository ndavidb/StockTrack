declare global {
  interface AlphaVantageMetaData {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": "Compact" | "Full";
    "5. Time Zone": string;
  }

  interface DailyStockData {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  }

  interface AlphaVantageDailyResponse {
    "Meta Data": AlphaVantageMetaData;
    "Time Series (Daily)": {
      [date: string]: DailyStockData;
    };
  }

  interface TickerData {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }

  interface StockGainersLossersResponse {
    metadata: string;
    last_updated: string;
    top_gainers: TickerData[];
    top_losers: TickerData[];
    most_actively_traded: TickerData[];
  }
}

export {};
