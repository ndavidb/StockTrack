using api.Database;
using api.Features.Portfolios.Shared;
using ErrorOr;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace api.Features.Portfolios.GetPortfolios;

public class GetPortfoliosHandler(AppDbContext db, ILogger<GetPortfoliosHandler> logger, IMapper mapper)
{
    public async Task<ErrorOr<List<PortfolioDto>>> Handle(string userId, CancellationToken cancellationToken)
    {
        try
        {
            var portfolios = await db.Portfolios
                .AsNoTracking()
                .Where(p => p.UserId == userId)
                .Select(p => new PortfolioDto(
                    p.Id,
                    p.PortfolioName,
                    p.Description,
                    p.Created)
                    ).ToListAsync(cancellationToken);

            logger.LogInformation("Portfolio retrieved successfully for {userId}", userId);

            if (portfolios.Count == 0)
            {
                return Error.NotFound("Portfolios not found");
            }
            return portfolios;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error retrieving portfolio for {userId}", userId);
            return Error.Failure("Error retrieving portfolio", e.Message);
        }
    }
}