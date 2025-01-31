using api.Common.Extensions;
using api.Database;
using api.Database.Entities;
using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Stocks.CreateStock;

public record CreateStockRequest(
    string Symbol, 
    string CompanyName, 
    string Industry, 
    string Sector, 
    string Website);

internal class CreateStockHandler(AppDbContext db, IMapper mapper, ILogger<CreateStockHandler> logger)
{
    public async Task<Stock> Handle(CreateStockRequest request)
    {   
        var stockExists = await db.Stocks.AnyAsync(x => x.Symbol == request.Symbol);
        if (stockExists)
        {
            logger.LogInformation("Stock already exists");
            return null;
        }
        
        var stock = mapper.Map<Stock>(request);
        await db.Stocks.AddAsync(stock);
        await db.SaveChangesAsync();
        return stock;
    }
}

public class CreateStock : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("stocks", Handle)
            .WithName("CreateStock")
            .WithSummary("Create a stock")
            .WithTags("Stocks");
    }

    private static async Task<IResult> Handle(
        CreateStockRequest request,
        CreateStockHandler handler,
        IValidator<CreateStockRequest> validator,
        CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var result = await handler.Handle(request);
        
        return Results.Created();
    }
}