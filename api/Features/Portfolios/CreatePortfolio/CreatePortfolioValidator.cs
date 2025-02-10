using api.Features.Portfolios.Shared;
using FluentValidation;

namespace api.Features.Portfolios.CreatePortfolio;

public class CreatePortfolioValidator : AbstractValidator<CreatePortfolioDto>
{
    public CreatePortfolioValidator()
    {
        RuleFor(x => x.PortfolioName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty();
    }
}