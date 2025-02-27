using api.Common.Extensions;
using api.Features.Stocks.Shared;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Stocks.GetStock;

public class GetStockEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/stock/{symbol}", Handler)
            .WithName("GetStock").WithSummary("Get a stock by symbol")
            .WithOpenApi()
            .WithTags("Stocks")
            .Produces<StockDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> Handler([FromRoute] string symbol, GetStockHandler handler, CancellationToken cancellationToken)
    {
        var stock = await handler.Handler(symbol, cancellationToken);
        
        return stock.Match(x => Results.Ok(x), errors => Results.NotFound(errors));
    }
}