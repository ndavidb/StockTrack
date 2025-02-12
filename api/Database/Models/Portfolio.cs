using Microsoft.AspNetCore.Identity;

namespace api.Database.Models;

public class Portfolio : EntityBase
{
    public string UserId { get; set; }
    public string PortfolioName { get; set; }
    public string Description { get; set; }
    
    // Navigation Properties
    public AppUser AppUser { get; set; }
    public ICollection<PortfolioStock> PortfolioStocks { get; set; } = new List<PortfolioStock>();
}