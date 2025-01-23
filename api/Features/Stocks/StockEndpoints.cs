using api.Common.Extensions;
using api.Features.Stocks.GetStockBySymbol;

namespace api.Features.Stocks;

public class StockEndpoints : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        var stocksGroup = app.MapGroup("stocks")
            .WithTags("Stocks")
            .RequireCors()
            .WithOpenApi();

        stocksGroup.MapGet("/", GetStockBySymbol.GetStockBySymbol.Handle)
            .WithName("GetStockBySymbol")
            .WithSummary("Get a stock by its symbol")
            .WithDescription("Returns a stock by its symbol")
            .Produces<GetStockBySymbolResponse>(200)
            .Produces(404);
        
        stocksGroup.MapPost("/", CreateStock.CreateStock.Handle)
            .WithName("CreateStock")
            .WithSummary("Create a new stock")
            .WithDescription("Creates a new stock")
            .Produces<GetStockBySymbolResponse>(200);
    }
}