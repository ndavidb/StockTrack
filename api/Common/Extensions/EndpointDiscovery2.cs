using System.Reflection;

namespace api.Common.Extensions;

public static class EndpointDiscovery2
{
    // Cache the endpoint types to avoid repeated assembly scanning
    private static readonly IEnumerable<Type> _endpointTypes;

    static EndpointDiscovery2()
    {
        // Do the assembly scanning once at startup
        _endpointTypes = DiscoverEndpointTypes().ToList();
    }

    public static void MapEndpoints2(this WebApplication app)
    {
        foreach (var endpointType in _endpointTypes)
        {
            var mapMethod = endpointType.GetMethod("MapEndpoint", 
                BindingFlags.Public | BindingFlags.Static);
            
            if (mapMethod != null)
            {
                try
                {
                    mapMethod.Invoke(null, [app]);
                }
                catch (Exception ex)
                {
                    // Log the specific endpoint type that failed
                    app.Logger.LogError(ex, 
                        "Failed to map endpoint of type {EndpointType}", 
                        endpointType.FullName);
                }
            }
        }        
    }

    private static IEnumerable<Type> DiscoverEndpointTypes()
    {
        // More specific assembly targeting
        var apiAssembly = typeof(EndpointDiscovery).Assembly;

        return apiAssembly.GetTypes()
            .Where(type => type.IsClass 
                           && !type.IsAbstract 
                           && typeof(IEndpoint).IsAssignableFrom(type));
    }
}