using System.Security.Claims;
using api.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Portfolios.DeletePortfolio;

public class DeletePortfolioEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/portfolio/{id}", DeletePortfolioHandler)
            .WithName("DeletePortfolio").WithSummary("Delete a portfolio")
            .WithOpenApi()
            .WithTags("Portfolios")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> DeletePortfolioHandler(
        ClaimsPrincipal user,
        [FromRoute] Guid id,
        DeletePortfolioHandler handler,
        CancellationToken cancellationToken)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Results.Unauthorized();
        }

        var result = await handler.Handle(id, userId, cancellationToken);
        
        return result.Match(
            _ => Results.Ok(),
            errors => Results.Problem(errors.First().Code)
        );
    }
}