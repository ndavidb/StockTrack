using api.Database;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Stocks.GetStockBySymbol;

public record GetStockBySymbolResponse(string symbol, string name, string industry, string sector, string website);
public class GetStockBySymbol
{
    public static async Task<IResult> Handle(
        AppDbContext db,
        string symbol,
        ILogger<GetStockBySymbol> logger,
        CancellationToken cancellationToken)
    {
        try
        {
            var stock = await db.Stocks
                .AsNoTracking()
                .Where(x => x.Symbol == symbol)
                .Select(
                    x => new GetStockBySymbolResponse(
                        x.Symbol,
                        x.CompanyName,
                        x.Industry,
                        x.Sector,
                        x.Website
                    ))
                .FirstOrDefaultAsync(cancellationToken);
            
            if (stock == null)
            {
                return Results.NotFound();
            }
            
            return Results.Ok(stock);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting stock by symbol");
            throw;
        }
    }
}