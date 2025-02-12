using System.Security.Claims;
using api.Common.Extensions;
using api.Features.Portfolios.Shared;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Portfolios.GetPortfolio;

public class GetPortfolioEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/portfolio/{id}", GetPortfolioHandler)
            .WithName("GetPortfolio").WithSummary("Get a portfolio")
            .WithOpenApi()
            .WithTags("Portfolios")
            .Produces<PortfolioDto>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> GetPortfolioHandler(CancellationToken cancellationToken, ClaimsPrincipal user,
        GetPortfolioHandler handler, [FromRoute] Guid id)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Results.Unauthorized();
        }

        var result = await handler.Handle(id, cancellationToken);

        return result.Match(
            portfolio => Results.Ok(portfolio),
            errors => Results.Problem(errors.First().Code));
    }
}