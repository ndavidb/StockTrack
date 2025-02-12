using System.Security.Claims;
using api.Common.Extensions;
using api.Common.Filters;
using api.Database.Models;
using api.Features.Portfolios.Shared;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace api.Features.Portfolios.CreatePortfolio;

public class CreatePortfolioEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/portfolio", CreatePortfolioHandler)
            .WithName("CreatePortfolio").WithSummary("Create a new portfolio")
            .WithOpenApi()
            .WithTags("Portfolios")
            .WithRequestValidation<CreatePortfolioValidator>()
            .Produces(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .RequireAuthorization();
    }

    private static async Task<IResult> CreatePortfolioHandler(
        CreatePortfolioDto request, 
        CreatePortfolioHandler handler,
        ClaimsPrincipal user,
        IValidator<CreatePortfolioDto> validator,
        CancellationToken cancellationToken)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
        {
            return Results.Unauthorized();
        }
        
        var result = await handler.Handle(request, userId, cancellationToken);
        
        return result.Match(
            portfolio => Results.Created($"/api/portfolio/{portfolio.Id}", portfolio),
            errors => Results.Problem(errors.First().Code));
    }
}