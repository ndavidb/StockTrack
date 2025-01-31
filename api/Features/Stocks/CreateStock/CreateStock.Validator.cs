using FluentValidation;

namespace api.Features.Stocks.CreateStock;

public class CreateStockRequestValidator : AbstractValidator<CreateStockRequest>
{
    public CreateStockRequestValidator()
    {
        RuleFor(x => x.Symbol).NotEmpty().MaximumLength(5);
        RuleFor(x => x.CompanyName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Industry).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Sector).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Website).NotEmpty().MaximumLength(100);
    }
    
}