public class FmpService(HttpClient httpClient, ILogger<FmpService> logger)
{
    private readonly string _apiKey = Environment.GetEnvironmentVariable("FMP_API_KEY")!;
    
}