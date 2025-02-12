using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using api.Database.Models;
using api.Features.Stocks.Shared;
using api.Infrastructure.External.FMP.Models;
using ErrorOr;

namespace api.Infrastructure.External.FMP;

public class FmpService(HttpClient httpClient, ILogger<FmpService> logger, IConfiguration configuration)
{
    private readonly string _apiKey = configuration["FMP_API_KEY"]!;

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
    
    public async Task<ErrorOr<decimal>> GetCurrentPrice(string symbol)
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
            
            throw new HttpRequestException("API request was not successful");
        }
        catch (Exception e)
        {
            logger.LogError(e, $"Error in GetCurrentPrice for symbol {symbol}: {e.Message}");
            return Error.Failure("Error in GetCurrentPrice", e.Message);
        }
    }
}