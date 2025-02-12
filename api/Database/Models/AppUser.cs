using Microsoft.AspNetCore.Identity;

namespace api.Database.Models;

public class AppUser : IdentityUser
{
    [PersonalData]
    public string? FirstName { get; set; }

    [PersonalData]
    public string? LastName { get; set; }
    
    public ICollection<Portfolio> Portfolios { get; set; } = new List<Portfolio>(); 
}