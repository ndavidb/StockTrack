using System.Security.Claims;
using api.Common.Extensions;
using api.Common.Filters;
using api.Features.Portfolios.Shared;
using Microsoft.AspNetCore.Mvc;

namespace api.Features.Portfolios.UpdatePortfolio;

public class UpdatePortfolioEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/portfolio/{id}", UpdatePortfolioHandler)
            .WithName("UpdatePortfolio").WithSummary("Update a portfolio")
            .WithOpenApi()
            .WithTags("Portfolios")
            .WithRequestValidation<UpdatePortfolioValidator>()
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> UpdatePortfolioHandler(ClaimsPrincipal user, UpdatePortfolioDto request,
        [FromRoute] Guid id, UpdatePortfolioHandler handler, CancellationToken cancellationToken)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var result = await handler.Handle(request, id, cancellationToken);

        return result.Match(
            _ => Results.Ok(),
            errors => Results.BadRequest(errors)
        );
    }
}