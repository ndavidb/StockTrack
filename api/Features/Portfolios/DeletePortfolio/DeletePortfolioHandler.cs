using api.Database;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace api.Features.Portfolios.DeletePortfolio;

public class DeletePortfolioHandler(AppDbContext db, ILogger<DeletePortfolioHandler> logger)
{
    public async Task<ErrorOr<Deleted>> Handle(Guid id, string userId, CancellationToken cancellationToken)
    {
        try
        {
            var portfolio = await db.Portfolios.FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId, cancellationToken);
            if (portfolio is null)
            {
                return Error.NotFound("Portfolio not found");
            }

            db.Portfolios.Remove(portfolio);
            await db.SaveChangesAsync(cancellationToken);

            return Result.Deleted;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting portfolio for {id}", id);
            return Error.Failure("Error deleting portfolio");
        }
    }
}