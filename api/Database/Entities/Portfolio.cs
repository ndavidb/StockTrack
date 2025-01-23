using Microsoft.AspNetCore.Identity;

namespace api.Database.Entities;

public class Portfolio
{
    public int Id { get; set; }
    public string AppUserId { get; set; }
    public int StockId { get; set; }
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    
    public IdentityUser AppUser { get; set; }
    public Stock Stock { get; set; }
}