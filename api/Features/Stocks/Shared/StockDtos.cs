namespace api.Features.Stocks.Shared;

public record CreateStockDto(string Symbol, string CompanyName, string Industry, string Sector, long MarketCap, string Website);
public record StockDto(Guid Id, string Symbol, string CompanyName, string Industry, string Sector, long MarketCap, string Website);