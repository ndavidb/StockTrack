namespace api.Features.Stocks.Shared;

public record CreateStockDto(string Symbol, string CompanyName, string Industry, string Sector, string Country, string Currency, long MarketCap, string Website);
public record StockDto(string Symbol, string CompanyName, string Industry, string Sector, string Country, string Currency, long MarketCap, string Website);