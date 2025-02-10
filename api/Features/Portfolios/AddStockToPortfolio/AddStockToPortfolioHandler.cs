using api.Database;
using api.Features.Stocks.CreateStock;
using api.Features.Stocks.Shared;
using ErrorOr;

namespace api.Features.Portfolios.AddStockToPortfolio;

public class AddStockToPortfolioHandler(AppDbContext db, ILogger<AddStockToPortfolioHandler> logger)
{
    public async Task<ErrorOr<Success>> Handle(Guid id, CreateStockDto request, string userId,
        CancellationToken cancellationToken)
    {
      throw new NotImplementedException();
    }
}