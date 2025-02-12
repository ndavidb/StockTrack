namespace api.Database.Models;

public class PortfolioStock : EntityBase
{
    public Guid PortfolioId { get; set; }
    public Portfolio Portfolio { set; get; }
    
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    
    public Guid StockId { get; set; }
    public Stock Stock { get; set; }
}