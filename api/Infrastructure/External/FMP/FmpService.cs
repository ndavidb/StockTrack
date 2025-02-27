using System.Globalization;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using api.Database.Models;
using api.Features.Stocks.Shared;
using api.Infrastructure.External.FMP.Models;
using ErrorOr;

namespace api.Infrastructure.External.FMP;

public class FmpService(HttpClient httpClient, ILogger<FmpService> logger, IConfiguration config)
{
    private readonly string _apiKey = config["FMP_API_KEY"]!;

    public async Task<ErrorOr<StockDto>> FindStockBySymbolAsync(string symbol)
    {
        try
        {
            var result =
                await httpClient.GetAsync(
                    $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_apiKey}");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                logger.LogInformation($"FMP API Response: {content}");

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
                };

                var stocks = JsonSerializer.Deserialize<List<FmpStock>>(content, options);

                if (stocks != null && stocks.Any())
                {
                    var stock = stocks.First();
                    logger.LogInformation("Stock found in FMP API");
                    return new StockDto(
                        stock.symbol,
                        stock.companyName,
                        stock.industry,
                        stock.sector,
                        stock.country,
                        stock.currency,
                        stock.mktCap,
                        stock.website);
                }
            } else if (result.StatusCode == HttpStatusCode.Unauthorized)
            {
                return Error.Unauthorized("Unauthorized access to FMP API");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Error in FindStockBySymbolAsync for symbol {symbol}: {ex.Message}");
            return Error.Failure("Error in FindStockBySymbolAsync", ex.Message);
        }

        return Error.NotFound("Stock not found internally nor in external services");
    }
    
    public async Task<decimal> GetCurrentPrice(string symbol)
    {
        try
        {
            var result =
                await httpClient.GetAsync(
                    $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_apiKey}");
            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                var task = JsonSerializer.Deserialize<FmpStock[]>(content);
                var stockPrice = (decimal)task[0].price; 
                return stockPrice;
            }
            
            throw new HttpRequestException("API request for current price was not successful");
        }
        catch (Exception e)
        {
            logger.LogError(e, $"Error in GetCurrentPrice for symbol {symbol}: {e.Message}");
            throw;
        }
    }
    
    public async Task<List<StockPriceInfo>> GetStockHistoryAsync(string symbol)
    {
        var endDate = DateTime.Today;
        var days = 31;
        var startDate = endDate.AddDays(-days);
        var formattedStartDate = startDate.ToString("yyyy-MM-dd");
        

        try
        {
            var apiKey = config["FMPKey"];
            var url = $"https://financialmodelingprep.com/api/v3/historical-price-full/{symbol}?from={formattedStartDate}&apikey={apiKey}";
            
            logger.LogInformation($"Fetching stock history for {symbol} from {formattedStartDate}");

            var response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            logger.LogDebug($"API Response: {content}");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var priceHistory = JsonSerializer.Deserialize<PriceHistoryResponse>(content, options);

            if (priceHistory?.Historical == null || !priceHistory.Historical.Any())
            {
                logger.LogWarning($"No historical data found for {symbol}");
                return new List<StockPriceInfo>();
            }

            return priceHistory.Historical
                .Select(h => new StockPriceInfo
                {
                    Date = DateTime.SpecifyKind(DateTime.ParseExact(h.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture), DateTimeKind.Utc),
                    Open = h.Open,
                    High = h.High,
                    Low = h.Low,
                    Close = h.Close,
                    Volume = h.Volume
                })
                .ToList();
        }
        catch (HttpRequestException e)
        {
            logger.LogError(e, $"HTTP request error while fetching stock history for {symbol}");
            throw;
        }
        catch (JsonException e)
        {
            logger.LogError(e, $"JSON deserialization error for {symbol} stock history");
            throw;
        }
        catch (Exception e)
        {
            logger.LogError(e, $"Unexpected error fetching stock history for {symbol}");
            throw;
        }
    }
}