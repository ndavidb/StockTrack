using api.Database;
using api.Features.Portfolios.Shared;
using AutoMapper;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Portfolios.UpdatePortfolio;

public class UpdatePortfolioHandler(ILogger<UpdatePortfolioHandler> logger, IMapper mapper, AppDbContext db)
{
    public async Task<ErrorOr<Success>> Handle(UpdatePortfolioDto request, Guid id,
        CancellationToken cancellationToken)
    {
        var portfolioExist = await db.Portfolios.AnyAsync(p => p.Id == id, cancellationToken);
        
        if (!portfolioExist)
        {
            return Error.Validation("Portfolio not found");
        }

        try
        {
            var portfolio = await db.Portfolios.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        
            mapper.Map(request, portfolio);
            await db.SaveChangesAsync(cancellationToken);
        
            logger.LogInformation("Portfolio updated successfully for {id}", id);

            return Result.Success;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error updating portfolio for {id}", id);
            return Error.Failure("Error updating portfolio");
        }   
        
    }
}