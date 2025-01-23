using api.Database;
using api.Database.Entities;

namespace api.Features.Stocks.CreateStock;

public record CreateStockRequest(string Symbol, string CompanyName, string Industry, string Sector, string Website);

public class CreateStock
{
    public static async Task<IResult> Handle(AppDbContext db, CreateStockRequest request, ILogger<CreateStock> logger,
        CancellationToken cancellationToken)
    {
        
        await db.Stocks.Add(stock);
        await db.SaveChangesAsync(cancellationToken);
        return Results.Created($"/stocks/{stock.Symbol}", stock);
        
    }
}