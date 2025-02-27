using api.Database;
using api.Database.Models;
using api.Features.Stocks.CreateStock;
using api.Features.Stocks.Shared;
using api.Infrastructure.External.FMP;
using AutoMapper;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Portfolios.AddStockToPortfolio;

public class AddStockToPortfolioHandler(AppDbContext db, ILogger<AddStockToPortfolioHandler> logger, FmpService fmpService, CreateStockHandler createStockHandler, IMapper mapper)
{
    public async Task<ErrorOr<Success>> Handle(Guid portfolioId, string symbol, string userId,
        CancellationToken cancellationToken)
    {
        var stock = await db.Stocks.Where(s => s.Symbol.ToUpper() == symbol.ToUpper()).Select(s => new {s.Id, s.Symbol})
            .FirstOrDefaultAsync(cancellationToken);

        if (stock is null)
        {
            var fmpStock = fmpService.FindStockBySymbolAsync(symbol);

            if (fmpStock.Result.IsError)
            {
                return Error.NotFound("Stock not found");
            }

            var stockDto = mapper.Map<CreateStockDto>(fmpStock);

            await createStockHandler.Handler(stockDto, cancellationToken);
        }

        stock = await db.Stocks.Where(s => s.Symbol.ToUpper() == symbol.ToUpper()).Select(s => new { s.Id , s.Symbol}).FirstOrDefaultAsync(cancellationToken);
        
        var currentPrice = await fmpService.GetCurrentPrice(symbol);
        
        var portfolioStock = new PortfolioStock {StockId = stock!.Id, PortfolioId = portfolioId, PurchasePrice = currentPrice, PurchaseDate = DateTime.UtcNow};

        await db.PortfolioStocks.AddAsync(portfolioStock, cancellationToken);

        await db.SaveChangesAsync(cancellationToken);
        
        return Result.Success;
    }
}