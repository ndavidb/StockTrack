using api.Database.Entities;
using AutoMapper;

namespace api.Features.Stocks.UpdateStock;

public class UpdateStockMapping : Profile
{
    public UpdateStockMapping()
    {
        CreateMap<UpdateStockRequest, Stock>();
    }
}