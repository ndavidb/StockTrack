using api.Features.Stocks.Shared;
using FluentValidation;

namespace api.Features.Stocks.CreateStock;

public class CreateStockValidator : AbstractValidator<CreateStockDto>
{
    public CreateStockValidator()
    {
        RuleFor(x => x.Symbol).NotEmpty().MaximumLength(5);
        RuleFor(x => x.CompanyName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Industry).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Sector).NotEmpty().MaximumLength(100);
        RuleFor(x => x.MarketCap).NotEmpty();
        RuleFor(x => x.Website).NotEmpty().MaximumLength(100);
    }
}