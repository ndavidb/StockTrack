public class FMPCompany
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;
    private readonly ILogger<FMPCompany> _logger;

    public FMPCompany(HttpClient httpClient, ILogger<FMPCompany> logger)
    {
        _apiKey = Environment.GetEnvironmentVariable("FMP_API_KEY")!;
        _httpClient = httpClient;
        _logger = logger;
    } 

}