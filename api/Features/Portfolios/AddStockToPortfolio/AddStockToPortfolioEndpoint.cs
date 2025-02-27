using System.Security.Claims;
using api.Common.Extensions;
using api.Common.Filters;
using api.Features.Portfolios.Shared;
using api.Features.Stocks.Shared;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Portfolios.AddStockToPortfolio;

public class AddStockToPortfolioEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/portfolio/{portfolioId}/stock", Handler)
            .WithName("AddStockToPortfolio").WithSummary("Add a stock to a portfolio")
            .WithOpenApi()
            .WithTags("Portfolios")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> Handler(ClaimsPrincipal user, 
        [FromRoute] Guid portfolioId,
        [FromBody] AddStockRequestDto request,
        AddStockToPortfolioHandler handler, 
        CancellationToken cancellationToken)
    {
        var userId  = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var result = await handler.Handle(portfolioId, request.Symbol, userId, cancellationToken);
        
        return result.Match(
            success => Results.Ok(success),
            errors => Results.BadRequest(errors.First().Description));
    }
}