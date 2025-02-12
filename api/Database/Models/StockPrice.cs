namespace api.Database.Models;

public class StockPrice : EntityBase
{
    public DateTime PriceDate { get; set; }
    public decimal Price { get; set; }

    // Navigation Properties
    public Guid StockId { get; set; }
    public Stock Stock { get; set; }
}