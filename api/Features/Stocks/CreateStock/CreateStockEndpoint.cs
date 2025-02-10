using System.Security.Claims;
using api.Common.Extensions;
using api.Common.Filters;
using api.Features.Stocks.Shared;

namespace api.Features.Stocks.CreateStock;

public class CreateStockEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/stock", Handler)
            .WithName("CreateStock").WithSummary("Create a new stock")
            .WithOpenApi()
            .WithTags("Stocks")
            .WithRequestValidation<CreateStockValidator>()
            .Produces(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .RequireAuthorization();
    }

    private static async Task<IResult> Handler(CreateStockDto request, 
        CreateStockHandler handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handler(request, cancellationToken);
        
        return result.Match(
            stock => Results.Created($"/api/stock/{stock.Id}", stock),
            errors => Results.BadRequest(errors));
    }
}