namespace api.Features.Portfolios.Shared;

public record PortfolioDto(Guid Id, string PortfolioName, string Description);
public record CreatePortfolioDto(string PortfolioName, string Description);
public record UpdatePortfolioDto(string PortfolioName, string Description);