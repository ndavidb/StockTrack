using System.Security.Claims;
using api.Common.Extensions;
using api.Common.Filters;
using api.Features.Stocks.Shared;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Portfolios.AddStockToPortfolio;

public class AddStockToPortfolioEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/portfolio/{id}/stock", Handler)
            .WithName("AddStockToPortfolio").WithSummary("Add a stock to a portfolio")
            .WithOpenApi()
            .WithTags("Portfolios")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> Handler(ClaimsPrincipal User, 
        [FromRoute] Guid id,
        [FromBody] CreateStockDto request,
        AddStockToPortfolioHandler handler, 
        CancellationToken cancellationToken)
    {
        var userId  = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Results.Unauthorized();
        }

        var result = await handler.Handle(id, request, userId, cancellationToken);
        
        throw new NotImplementedException();
    }
}