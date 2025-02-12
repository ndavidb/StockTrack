using api.Database;
using api.Database.Models;
using api.Features.Portfolios.Shared;
using AutoMapper;
using ErrorOr;

namespace api.Features.Portfolios.CreatePortfolio;

public class CreatePortfolioHandler(AppDbContext db, IMapper mapper, ILogger<CreatePortfolioHandler> logger)
{
    public async Task<ErrorOr<PortfolioDto>> Handle(
        CreatePortfolioDto request,
        string userId,
        CancellationToken cancellationToken)
    {
        try
        {
            var portfolio = mapper.Map<Portfolio>(request);
            portfolio.UserId = userId;
            
            await db.Portfolios.AddAsync(portfolio, cancellationToken);
            await db.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Portfolio created successfully for {userId}", userId);
            
            return mapper.Map<PortfolioDto>(portfolio);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating portfolio");
            return Error.Failure("Error creating portfolio", e.Message);
        }
        
    }
}