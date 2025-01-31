using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Database.Entities;

public class Stock
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string Sector { get; set; } = string.Empty;
    public long MarketCap { get; set; }
    public string Website { get; set; } = string.Empty;
    
    public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    public List<StockPrice> StockPrices { get; set; } = new List<StockPrice>();
}