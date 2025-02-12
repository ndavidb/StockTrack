using api.Features.Portfolios.Shared;
using FluentValidation;

namespace api.Features.Portfolios.UpdatePortfolio;

public class UpdatePortfolioValidator : AbstractValidator<UpdatePortfolioDto>
{
    public UpdatePortfolioValidator()
    {
        RuleFor(x => x.PortfolioName).NotEmpty().WithMessage("Portfolio name is required.");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required.");
    }
    
}