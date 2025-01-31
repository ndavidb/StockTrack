using api.Common.Extensions;
using api.Database;
using api.Database.Entities;
using api.Features.Stocks.GetStockBySymbol;
using AutoMapper;
using ErrorOr;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Stocks.UpdateStock;

public record UpdateStockRequest(string companyName, string industry, string sector, string website);

internal class UpdateStockHandler(AppDbContext db, IMapper mapper, ILogger<UpdateStockHandler> logger)
{
    public async Task<ErrorOr<Stock>> Handle(string symbol, UpdateStockRequest request)
    {
        try
        {
            var stock = await db.Stocks.Where(x => x.Symbol == symbol).FirstOrDefaultAsync();
            if (stock is null)
            {
                logger.LogError("Stock does not exist");
                return Error.NotFound($"Stock with symbol {symbol} does not exist");
            }

            mapper.Map(request, symbol);

            await db.SaveChangesAsync();

            logger.LogInformation("Stock updated");

            return stock;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error updating stock");
            throw;
        }
    }
}

public class UpdateStockEndpoint : IEndpoint 
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/stocks/{symbol}", Handle)
            .WithName("UpdateStock")
            .WithSummary("Update a stock")
            .WithTags("Stocks");
    }

    private static async Task<IResult> Handle(
        [FromRoute] string symbol,
        [FromServices] UpdateStockHandler handler,
        [FromBody] UpdateStockRequest request,
        IValidator<UpdateStockRequest> validator,
        CancellationToken ct)
    {
        var validationResult = await validator.ValidateAsync(request, ct);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }
        
        var result = await handler.Handle(symbol, request);

        return result.Match(
            stock => Results.Ok(stock.Symbol),
            errors => Results.Problem(errors.First().Description));
    }
}