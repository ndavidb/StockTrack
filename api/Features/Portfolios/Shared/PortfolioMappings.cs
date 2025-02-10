using api.Database.Models;
using AutoMapper;

namespace api.Features.Portfolios.Shared;

public class PortfolioMappings : Profile
{
    public PortfolioMappings()
    {
        CreateMap<CreatePortfolioDto, Portfolio>();
        CreateMap<UpdatePortfolioDto, Portfolio>();
        CreateMap<Portfolio, PortfolioDto>();
    }    
}