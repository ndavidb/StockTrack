using api.Database;
using api.Features.Stocks.Shared;
using AutoMapper;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Stocks.GetStock;

public class GetStockHandler(AppDbContext db, ILogger<GetStockHandler> logger, IMapper mapper)
{
    public async Task<ErrorOr<StockDto>> Handler(string symbol, CancellationToken cancellationToken)
    { 
        var stock = await db.Stocks.FirstOrDefaultAsync(s => s.Symbol.ToUpper() == symbol.ToUpper(), cancellationToken);
        
        if (stock == null)
        {
            return Error.NotFound("Stock not found");
        }
        
        return mapper.Map<StockDto>(stock);;
    }
}