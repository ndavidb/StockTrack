namespace api.Features.Portfolios.Shared;

public record PortfolioDto(Guid Id, string PortfolioName, string Description, DateTimeOffset Created);
public record CreatePortfolioDto(string PortfolioName, string Description);
public record UpdatePortfolioDto(string PortfolioName, string Description);
public record AddStockRequestDto (string Symbol);
