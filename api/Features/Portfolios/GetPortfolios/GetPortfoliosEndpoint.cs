using System.Security.Claims;
using api.Common.Extensions;

namespace api.Features.Portfolios.GetPortfolios;

public class GetPortfoliosEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/portfolios", Handler)
            .WithName("GetPortfolios").WithSummary("Get all portfolios")
            .WithOpenApi()
            .WithTags("Portfolios")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    private static async Task<IResult> Handler (
        ClaimsPrincipal user,
        GetPortfoliosHandler handler,
        CancellationToken cancellationToken)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Results.Unauthorized();
        }

        var result = await handler.Handle(userId, cancellationToken);
        
        return result.Match(
            portfolios => Results.Ok(portfolios),
            errors => Results.NotFound(errors.First().Code));
        
        
    }
}