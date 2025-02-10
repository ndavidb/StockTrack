namespace api.Database.Models;

public class Stock : EntityBase
{
    public string Symbol { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string Sector { get; set; } = string.Empty;
    public long MarketCap { get; set; }
    public string Website { get; set; } = string.Empty;
    
    public ICollection<PortfolioStock> PortfolioStocks { get; set; } = new List<PortfolioStock>();
    public ICollection<StockPrice> StockPrices { get; set; } = new List<StockPrice>();
}