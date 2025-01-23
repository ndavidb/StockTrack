using api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations;

public class StockPriceConfiguration : IEntityTypeConfiguration<StockPrice>
{
    public void Configure(EntityTypeBuilder<StockPrice> builder)
    {
        builder.HasKey(sp => sp.Id);
        
        builder.Property(sp => sp.Symbol)
            .IsRequired()
            .HasMaxLength(5);
        
        builder.Property(sp => sp.Price)
            .IsRequired();
        
        builder.Property(sp => sp.Date)
            .IsRequired();
        
        builder.HasIndex(sp => sp.Symbol);
        
        builder.HasOne(sp => sp.Stock)
            .WithMany(sp => sp.StockPrices)
            .HasForeignKey(sp => sp.StockId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}