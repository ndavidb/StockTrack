using FluentValidation;

namespace api.Features.Stocks.UpdateStock;

public class UpdateStockValidator : AbstractValidator<UpdateStockRequest>
{
 public UpdateStockValidator()
    {
        RuleFor(x => x.companyName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.industry).NotEmpty().MaximumLength(100);
        RuleFor(x => x.sector).NotEmpty().MaximumLength(100);
        RuleFor(x => x.website).NotEmpty().MaximumLength(100);
    }
}