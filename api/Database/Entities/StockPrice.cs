﻿namespace api.Database.Entities;

public class StockPrice
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Price { get; set; }
    public int StockId { get; set; }
    
    public Stock Stock { get; set; }
}