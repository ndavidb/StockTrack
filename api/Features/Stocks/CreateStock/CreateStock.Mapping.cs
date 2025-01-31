using api.Database.Entities;
using AutoMapper;
using FluentValidation;

namespace api.Features.Stocks.CreateStock;

public class CreateStockMapper : Profile
{
    public CreateStockMapper()
    {
        CreateMap<CreateStockRequest, Stock>();
    }
}