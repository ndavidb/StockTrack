using api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations;

public class StockPriceConfiguration : IEntityTypeConfiguration<StockPrice>
{
    public void Configure(EntityTypeBuilder<StockPrice> builder)
    {
        builder.HasKey(sp => sp.Id);

        builder.Property(sp => sp.Price)
            .IsRequired();
        
        builder.Property(sp => sp.PriceDate)
            .IsRequired();
        
        builder.HasOne(sp => sp.Stock)
            .WithMany(sp => sp.StockPrices)
            .HasForeignKey(sp => sp.StockId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasIndex(sp => new {sp.StockId, sp.PriceDate}).IsUnique();
    }
}