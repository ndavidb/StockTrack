using api.Common.Extensions;
using ErrorOr;

namespace api.Infrastructure.External.FMP;

public class Checkendpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/check",
            async (FmpService handler, string symbol) =>
            {
                var result = await handler.FindStockBySymbolAsync(symbol);
                return result.Match(x => Results.Ok(x), errors => Results.NotFound(errors));
            })
            .WithOpenApi()
            .WithTags("Test")
            .WithName("CheckEndpoint");
    }
}