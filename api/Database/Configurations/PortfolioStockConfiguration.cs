using api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations;

public class PortfolioStockConfiguration : IEntityTypeConfiguration<PortfolioStock>
{
    public void Configure(EntityTypeBuilder<PortfolioStock> builder)
    {
        builder.Property(x => x.PurchaseDate).IsRequired();
        builder.Property(x => x.PurchasePrice).IsRequired();
        
        builder.HasOne(ps => ps.Stock)
            .WithMany(ps => ps.PortfolioStocks)
            .HasForeignKey(ps => ps.StockId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(ps => ps.Portfolio)
            .WithMany(ps => ps.PortfolioStocks)
            .HasForeignKey(ps => ps.PortfolioId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasIndex(ps => new {ps.PortfolioId, ps.StockId}).IsUnique();
    }
}