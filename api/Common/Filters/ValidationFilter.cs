using FluentValidation;

namespace api.Common.Filters;

public sealed class ValidationFilter<TRequest>(ILogger<ValidationFilter<TRequest>> logger) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context, 
        EndpointFilterDelegate next)
    {
        var requestName = typeof(TRequest).Name;
        var validator = context.HttpContext.RequestServices.GetService<IValidator<TRequest>>();
        
        if (validator is null)
        {
            logger.LogDebug("{Request}: No validator configured", requestName);
            return await next(context);
        }

        var model = context.Arguments
            .OfType<TRequest>()
            .FirstOrDefault();

        if (model is null)
        {
            logger.LogWarning("{Request}: Request model is null", requestName);
            return TypedResults.BadRequest();
        }

        logger.LogDebug("{Request}: Validating request", requestName);
        var validationResult = await validator.ValidateAsync(model, context.HttpContext.RequestAborted);

        if (!validationResult.IsValid)
        {
            logger.LogWarning("{Request}: Validation failed", requestName);
            return TypedResults.ValidationProblem(validationResult.ToDictionary());
        }

        logger.LogDebug("{Request}: Validation succeeded", requestName);
        return await next(context);
    }
}

public static class ValidationExtensions
{
    public static RouteHandlerBuilder WithRequestValidation<TRequest>(this RouteHandlerBuilder builder)
    {
        return builder.AddEndpointFilter<ValidationFilter<TRequest>>()
            .ProducesValidationProblem();
    }
}