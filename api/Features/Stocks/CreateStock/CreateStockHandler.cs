using api.Database;
using api.Database.Models;
using api.Features.Stocks.Shared;
using AutoMapper;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Stocks.CreateStock;

public class CreateStockHandler(AppDbContext db, ILogger<CreateStockHandler> logger, IMapper mapper)
{
    public async Task<ErrorOr<StockDto>> Handler(CreateStockDto request, CancellationToken cancellationToken)
    {
        var stockExist = await db.Stocks.AnyAsync(s => s.Symbol.ToUpper() == request.Symbol.ToUpper(), cancellationToken);
        
        if (stockExist)
        {
            return Error.Conflict($"Stock {request.Symbol} already exists");
        }
        
        try
        {
            var stock = mapper.Map<Stock>(request);

            db.Stocks.Add(stock);
            await db.SaveChangesAsync(cancellationToken);
        
            logger.LogInformation("Stock created successfully");
            
            return mapper.Map<StockDto>(stock);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating stock");
            return Error.Failure("Error creating stock", e.Message);
        }
        
    }
}