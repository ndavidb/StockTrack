using api.Database;
using api.Features.Portfolios.Shared;
using AutoMapper;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Portfolios.GetPortfolio;

public class GetPortfolioHandler(AppDbContext db, ILogger<GetPortfolioHandler> logger, IMapper mapper)
{
    public async Task<ErrorOr<PortfolioDto>> Handle(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var portfolio = await db.Portfolios.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
            if (portfolio is null)
            {
                return Error.NotFound("Portfolio not found");
            }

            return mapper.Map<PortfolioDto>(portfolio);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error retrieving portfolio for {id}", id);
            return Error.Failure("Error retrieving portfolio", e.Message);
        }
    }
}