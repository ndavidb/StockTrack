using api.Database.Models;
using api.Infrastructure.External.FMP.Models;
using AutoMapper;

namespace api.Features.Stocks.Shared;

public class StockMappings : Profile
{
    public StockMappings()
    {
        CreateMap<CreateStockDto, Stock>();
        CreateMap<FmpStock, CreateStockDto>()
            .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.symbol))
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.companyName))
            .ForMember(dest => dest.Industry, opt => opt.MapFrom(src => src.industry))
            .ForMember(dest => dest.Sector, opt => opt.MapFrom(src => src.sector))
            .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.country))
            .ForMember(dest => dest.Currency, opt => opt.MapFrom(src => src.currency))
            .ForMember(dest => dest.MarketCap, opt => opt.MapFrom(src => src.mktCap))
            .ForMember(dest => dest.Website, opt => opt.MapFrom(src => src.website));

        CreateMap<Stock, StockDto>();
    }
}