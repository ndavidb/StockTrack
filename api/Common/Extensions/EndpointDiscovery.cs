using System.Reflection;

namespace api.Common.Extensions;

public static class EndpointDiscovery
{
    public static void MapEndpoints(this WebApplication app)
    {
        var endpointTypes = DiscoverEndpointTypes();

        foreach (var endpointType in endpointTypes)
        {
            var mapMethod = endpointType.GetMethod("MapEndpoint", BindingFlags.Public | BindingFlags.Static);
            if (mapMethod != null)
            {
                mapMethod.Invoke(null, [app]);
            }
        }        
    }

    private static IEnumerable<Type> DiscoverEndpointTypes()
    {
        var assemblies = AppDomain.CurrentDomain.GetAssemblies()
            .Where(assembly => assembly.GetName().Name!.StartsWith("api"));

        return assemblies.SelectMany(assembly => assembly.GetTypes())
            .Where(type => type.IsClass && !type.IsAbstract && typeof(IEndpoint).IsAssignableFrom(type));
    }
}