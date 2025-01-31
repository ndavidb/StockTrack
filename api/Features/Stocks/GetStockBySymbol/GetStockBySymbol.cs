using api.Common.Extensions;
using api.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Stocks.GetStockBySymbol;

public record GetStockBySymbolResponse(string symbol, string name, string industry, string sector, string website);
public class GetStockBySymbolHandler
{
    public static async Task<IResult> Handle(
        AppDbContext db,
        [FromQuery] string symbol,
        ILogger<GetStockBySymbolHandler> logger,
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

public class GetStockBySymbol : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/stocks/{symbol}", GetStockBySymbolHandler.Handle)
            .WithName("GetStockBySymbol")
            .WithSummary("Get a stock by symbol")
            .WithTags("Stocks");
    }
}