using api.Database.Models;
using AutoMapper;

namespace api.Features.Stocks.Shared;

public class StockMappings : Profile
{
    public StockMappings()
    {
        CreateMap<CreateStockDto, Stock>();
        CreateMap<Stock, StockDto>();

    }
}